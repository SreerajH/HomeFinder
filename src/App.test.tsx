import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { testListings } from './test/fixtures';
import { renderWithProviders } from './test/renderWithProviders';

// Fake versions of the Response object fetch() resolves with
const okResponse = () => ({ ok: true, status: 200, json: async () => testListings });
const serverErrorResponse = () => ({ ok: false, status: 500, json: async () => ({}) });

describe('App', () => {
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    // Replace the real fetch so tests never touch the network
    fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('shows skeletons while loading, then renders listing cards', async () => {
    fetchMock.mockResolvedValue(okResponse());
    renderWithProviders(<App />);

    // Straight after the first render the request is still in flight
    expect(screen.getAllByTestId('listing-skeleton').length).toBeGreaterThan(0);

    // findAll* waits until the cards appear
    const cards = await screen.findAllByRole('article');
    expect(cards).toHaveLength(testListings.length);
    expect(screen.queryAllByTestId('listing-skeleton')).toHaveLength(0);
    expect(screen.getByText('Lakeview Apartment')).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith('/data/listings.json', expect.anything());
  });

  it('shows the error Alert when fetch fails, and Retry calls fetch again', async () => {
    fetchMock.mockResolvedValueOnce(serverErrorResponse()).mockResolvedValueOnce(okResponse());
    const user = userEvent.setup();
    renderWithProviders(<App />);

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent(/couldn't load listings/i);
    expect(alert).toHaveTextContent(/HTTP 500/);
    expect(fetchMock).toHaveBeenCalledTimes(1);

    await user.click(within(alert).getByRole('button', { name: /retry/i }));

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(await screen.findAllByRole('article')).toHaveLength(testListings.length);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('filters the cards as the user types in the search box', async () => {
    fetchMock.mockResolvedValue(okResponse());
    const user = userEvent.setup();
    renderWithProviders(<App />);
    await screen.findAllByRole('article');

    await user.type(screen.getByRole('textbox', { name: /search/i }), 'pune');

    const cards = screen.getAllByRole('article');
    expect(cards).toHaveLength(1);
    expect(within(cards[0]).getByText('Hilltop Villa')).toBeInTheDocument();
    expect(screen.queryByText('Lakeview Apartment')).not.toBeInTheDocument();
  });

  it('shows the empty state when nothing matches, and can clear the filters', async () => {
    fetchMock.mockResolvedValue(okResponse());
    const user = userEvent.setup();
    renderWithProviders(<App />);
    await screen.findAllByRole('article');

    await user.type(screen.getByRole('textbox', { name: /search/i }), 'atlantis');

    expect(screen.getByText(/no homes match your filters/i)).toBeInTheDocument();
    expect(screen.queryAllByRole('article')).toHaveLength(0);

    await user.click(screen.getByRole('button', { name: /clear all filters/i }));

    expect(screen.getAllByRole('article')).toHaveLength(testListings.length);
    expect(screen.getByRole('textbox', { name: /search/i })).toHaveValue('');
  });

  it('sorts the cards when a sort option is chosen', async () => {
    fetchMock.mockResolvedValue(okResponse());
    const user = userEvent.setup();
    renderWithProviders(<App />);
    await screen.findAllByRole('article');

    // Read the titles in the order they appear on screen
    const cardTitles = () =>
      screen.getAllByRole('article').map((card) => within(card).getByRole('heading', { level: 3 }).textContent);

    // Default is newest first (fixtures: Plot 20 Oct, Apartment 1 Oct, Villa 15 Sep)
    expect(cardTitles()).toEqual(['Corner Plot', 'Lakeview Apartment', 'Hilltop Villa']);

    // An MUI Select is not a native <select>: open it like a user would, then pick an option
    await user.click(screen.getByRole('combobox', { name: /sort by/i }));
    await user.click(screen.getByRole('option', { name: /price: high to low/i }));

    expect(cardTitles()).toEqual(['Hilltop Villa', 'Lakeview Apartment', 'Corner Plot']);
  });

  it('opens the details dialog for the listing that was clicked', async () => {
    fetchMock.mockResolvedValue(okResponse());
    const user = userEvent.setup();
    renderWithProviders(<App />);
    await screen.findAllByRole('article');

    // Click the second card's button, so we know the dialog isn't just showing the first listing
    await user.click(screen.getByRole('button', { name: /view details for hilltop villa/i }));

    const dialog = await screen.findByRole('dialog');
    expect(within(dialog).getByRole('heading', { name: /hilltop villa/i })).toBeInTheDocument();
    expect(within(dialog).getByText('₹3,00,00,000')).toBeInTheDocument();
    expect(within(dialog).getByText(/views across baner hill/i)).toBeInTheDocument();
    expect(within(dialog).queryByText('Lakeview Apartment')).not.toBeInTheDocument();

    await user.click(within(dialog).getByRole('button', { name: /^close$/i }));
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('saves a listing: updates the heart, the header count, the store and localStorage', async () => {
    fetchMock.mockResolvedValue(okResponse());
    const user = userEvent.setup();
    const { store } = renderWithProviders(<App />);
    await screen.findAllByRole('article');

    expect(screen.getByText('Saved (0)')).toBeInTheDocument();

    const heart = screen.getByRole('button', { name: /^save hilltop villa$/i });
    expect(heart).toHaveAttribute('aria-pressed', 'false');

    await user.click(heart);

    // The UI updated everywhere that reads this state...
    expect(screen.getByText('Saved (1)')).toBeInTheDocument();
    const savedHeart = screen.getByRole('button', { name: /remove hilltop villa from saved/i });
    expect(savedHeart).toHaveAttribute('aria-pressed', 'true');
    // ...because the Redux store changed, and the change was persisted
    expect(store.getState().saved.ids).toEqual(['t-2']);
    expect(JSON.parse(localStorage.getItem('homefinder:saved') ?? '[]')).toEqual(['t-2']);

    // Clicking again unsaves it
    await user.click(savedHeart);
    expect(screen.getByText('Saved (0)')).toBeInTheDocument();
    expect(store.getState().saved.ids).toEqual([]);
  });
});
