import { Request, Response } from 'express';
import { getDogImage } from '../controllers/dogController';
import * as dogService from '../services/dogService';

jest.mock('../services/dogService');

describe('Dog Controller Tests', () => {
  // Test 3
  it('should return success true and the service data', async () => {
    const mockServiceData = {
      imageUrl: "https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg",
      status: "success"
    };
    
    (dogService.getRandomDogImage as jest.Mock).mockResolvedValue(mockServiceData);

    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;

    await getDogImage(req, res);

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: mockServiceData
    });
  });
});