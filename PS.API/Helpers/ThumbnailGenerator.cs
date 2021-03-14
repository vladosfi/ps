using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.IO;

namespace PS.API.Helpers
{
    public class ThumbnailGenerator
    {
        public static void GenerateThumbnail(string inputFilePath, string fileName, string thumbnailFolder, int maxPixels)
        {
            string input = Path.Combine(inputFilePath, fileName);
            string output = Path.Combine(inputFilePath, thumbnailFolder);
            string outputThumbnail = Path.Combine(output, fileName);

            //Create directory 
            if (!Directory.Exists(output))
            {
                Directory.CreateDirectory(output);
            }

            // Load image.
            Image image = Image.FromFile(input);

            // Compute thumbnail size.
            Size thumbnailSize = GetThumbnailSize(image, maxPixels);

            // Get thumbnail.
            // Image thumbnail = image.GetThumbnailImage(thumbnailSize.Width,
            //     thumbnailSize.Height, null, IntPtr.Zero);

            Image thumbnail = ResizeImage(image, thumbnailSize);

            // Save thumbnail.
            thumbnail.Save(outputThumbnail);
        }


        /// <summary>
        /// Resize an image with high quality
        /// </summary>
        private static Image ResizeImage(Image srcImage, Size thumbnailSize)
        {
            var b = new Bitmap(thumbnailSize.Width, thumbnailSize.Height);
            using (var g = Graphics.FromImage((Image)b))
            {
                g.InterpolationMode = InterpolationMode.HighQualityBicubic;
                g.DrawImage(srcImage, 0, 0, b.Width, b.Height);
            }
            return b;
        }

        private static Size GetThumbnailSize(Image original, int maxPixels)
        {
            // Width and height.
            int originalWidth = original.Width;
            int originalHeight = original.Height;

            // Compute best factor to scale entire image based on larger dimension.
            double factor;

            if (originalWidth > originalHeight)
            {
                factor = (double)maxPixels / originalWidth;
            }
            else
            {
                factor = (double)maxPixels / originalHeight;
            }

            // Return thumbnail size.
            return new Size((int)(originalWidth * factor), (int)(originalHeight * factor));
        }
    }
}
