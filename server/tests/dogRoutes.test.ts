import request from 'supertest';
import express from 'express';
import dogRoutes from '../routes/dogRoutes';
import * as dogController from '../controllers/dogController';

const app = express();
app.use(express.json());
app.use('/api/dogs', dogRoutes); 

jest.mock('../controllers/dogController');

describe('Dog Routes Tests', () => {
   // Test 4
   it('should return 200 and success: true on GET /api/dogs/random', async () => {
     const mockResponse = {
       success: true,
       data: {
         imageUrl: "https://images.dog.ceo/breeds/stbernard/n02109525_15579.jpg",
         status: "success"
       }
     };

     (dogController.getDogImage as jest.Mock).mockImplementation((_req, res) => {
       res.status(200).json(mockResponse);
     });

     const response = await request(app).get('/api/dogs/random');

     expect(response.status).toBe(200);
     expect(response.body.success).toBe(true);
     expect(response.body.data.imageUrl).toContain("n02109525_15579.jpg");
   });

   //test 5
   it('should return 500 and network error message', async () => {
     const mockError = {
       success: false,
       error: "Failed to fetch dog image: Network error"
     };

     (dogController.getDogImage as jest.Mock).mockImplementation((_req, res) => {
       res.status(500).json(mockError);
     });

    
     const response = await request(app).get('/api/dogs/random');

     expect(response.status).toBe(500);
     expect(response.body.success).toBe(false);
     expect(response.body.error).toBe("Failed to fetch dog image: Network error");
   });
});