namespace CoreLibrary
{
    public class HasListAttribute : System.Attribute
    {
        public string ListPropertyName = "";

        public HasListAttribute(string listPropertyName)
        {
            ListPropertyName = listPropertyName;
        }
    }
}
