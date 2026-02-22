import { getRandomDogImage } from '../services/dogService';

describe('Dog Service Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test 1
  it('should return dog image data when the API call is successful', async () => {
    const mockApiResponse = {
      message: "https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg",
      status: "success"
    };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockApiResponse,
    });

    const result = await getRandomDogImage();

    expect(result.imageUrl).toBe(mockApiResponse.message);
    expect(result.status).toBe('success');
    expect(global.fetch).toHaveBeenCalledTimes(1); 
  });

  // Test 2
  it('should throw error when API returns 500 status', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500
    });

   await expect(getRandomDogImage()).rejects.toThrow("Failed to fetch dog image: Dog API returned status 500");
  });
});