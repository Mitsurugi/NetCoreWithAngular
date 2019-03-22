
namespace CoreLibrary
{
    public class FileModel<TKey> : IEntity<TKey>
    {
        public TKey Id { get; set; }

        public byte[] Data { get; set; }

        public string MimeType { get; set; }

        public string FileName { get; set; }
    }
}
