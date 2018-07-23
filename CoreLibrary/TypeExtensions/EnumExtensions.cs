using System;
using System.ComponentModel.DataAnnotations;

namespace CoreLibrary
{
    public static class EnumExtensions
    {
        public static string GetDisplayName(this Enum en)
        {
            var type = en.GetType();
            var memInfo = type.GetMember(en.ToString());

            if (memInfo.Length > 0)
            {
                var attrs = memInfo[0].GetCustomAttributes(typeof(DisplayAttribute), false);

                if (attrs.Length > 0)
                    return ((DisplayAttribute)attrs[0]).Name;
            }

            return en.ToString();
        }
    }
}
