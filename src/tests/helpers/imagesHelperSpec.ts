import imageHelpers from '../../helpers/images'



describe('Image Resizing', () => {
	it('resizes an image', async () => {
                const response = await imageHelpers.resizeImage('santamonica', 500, 600, 'jpg');
                expect(response.format).toBe('jpeg');
                expect(response.width).toBe(500);
                expect(response.height).toBe(600);
	});
});
