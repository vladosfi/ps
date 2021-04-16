using System.IO;
using Microsoft.Extensions.FileProviders;

namespace PS.API.Helpers
{
    public static class FileHelper
    {
        public static void DeleteFile(string physicalFile)
        {
            if (File.Exists(physicalFile))  {
                File.Delete(physicalFile);    
            }
        }

        public static void DeleteFiles(IFileProvider physicalFileProvider)
        {
            if (physicalFileProvider is PhysicalFileProvider)
            {
                var directory = physicalFileProvider.GetDirectoryContents(string.Empty);
                foreach (var file in directory)
                {
                    if (!file.IsDirectory)
                    {
                        var fileInfo = new System.IO.FileInfo(file.PhysicalPath);
                        fileInfo.Delete();
                    }
                }
            }
        }
    }
}