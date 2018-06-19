using System;

namespace CoreLibrary
{
    public static class ExceptionExtensions
    {
        public static string GetFullMessage(this Exception exception, string message = null)
        {
            message = string.IsNullOrEmpty(message)
                ? exception.Message
                : message + " => " + exception.Message;

            if (exception.InnerException == null)
                return message;

            return GetFullMessage(exception.InnerException, message);
        }
    }
}
