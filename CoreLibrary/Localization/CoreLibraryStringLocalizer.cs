using System.Collections.Generic;
using System.Globalization;
using Microsoft.Extensions.Localization;
using System.Linq;

namespace CoreLibrary.Localization
{
    public class CoreLibraryStringLocalizer : IStringLocalizer
    {
        private CultureInfo _currentCulture { get; set; }
        protected Dictionary<string, Dictionary<string,string>> _strings { get; set; }

        public CoreLibraryStringLocalizer() : this(CultureInfo.CurrentUICulture)
        {
        }

        public CoreLibraryStringLocalizer(CultureInfo culture)
        {
            _currentCulture = culture;
            _strings = new Dictionary<string, Dictionary<string, string>>();
            CreateStrings();
            AddOrUpdateString();
        }

        public LocalizedString this[string name] {
            get
            {
                if (!_strings.ContainsKey(_currentCulture.Name))
                {
                    return new LocalizedString(name, name);
                }
                if (!_strings[_currentCulture.Name].ContainsKey(name))
                {
                    return new LocalizedString(name, name);
                }

                return new LocalizedString(name, _strings[_currentCulture.Name][name]);
            }
        }

        public LocalizedString this[string name, params object[] arguments] {
            get
            {
                return new LocalizedString(name, string.Format(this[name].Value, arguments));
            }
        }

        public IEnumerable<LocalizedString> GetAllStrings(bool includeParentCultures)
        {
            return _strings.Values.SelectMany(i => i).Select(i => new LocalizedString(i.Key, i.Value));
        }

        public IStringLocalizer WithCulture(CultureInfo culture)
        {
            return new CoreLibraryStringLocalizer(culture);
        }

        private void CreateStrings()
        {
            var enUSDict = new Dictionary<string, string>();
            var ruRUDict = new Dictionary<string, string>();

            _strings.Add("en-US", enUSDict);
            _strings.Add("ru-RU", ruRUDict);

            enUSDict.Add("FieldRequired", "Field required");
            ruRUDict.Add("FieldRequired", "Поле обязательно");

            enUSDict.Add("ValueNotFound", "Value not found");
            ruRUDict.Add("ValueNotFound", "Значение не найдено");

            enUSDict.Add("InvalidValue", "Invalid value");
            ruRUDict.Add("InvalidValue", "Неправильное значение");

            enUSDict.Add("ImportRowError", "Row {0} column '{1}' - {2}");
            ruRUDict.Add("ImportRowError", "Строка {0} столбец '{1}' - {2}");

            enUSDict.Add("RoleNotFound", "Role '{0}' not found");
            ruRUDict.Add("RoleNotFound", "Роль '{0}' не найдена");

            enUSDict.Add("InvalidLoginPass", "Invalid login or password");
            ruRUDict.Add("InvalidLoginPass", "Неправильный логин или пароль");

            enUSDict.Add("FileNull", "File is null");
            ruRUDict.Add("FileNull", "Файл не выбран");

            enUSDict.Add("FileNotFound", "File not found");
            ruRUDict.Add("FileNotFound", "Файл не найден");            
        }

        protected virtual void AddOrUpdateString()
        {

        }
    }
}
