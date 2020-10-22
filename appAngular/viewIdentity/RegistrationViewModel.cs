using appAngular.viewIdentity.validations;
using FluentValidation;
using ServiceStack.FluentValidation.Attributes;

namespace appAngular.viewIdentity
{
    [Validator(typeof(RegistrationViewModelValidator))]
    public class RegistrationViewModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName {get;set;}
        public string LastName {get;set;}
        public string Location { get; set; }   
    }
}