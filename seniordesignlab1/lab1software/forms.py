from django import forms
from django.contrib.auth.models import User
from django.core.validators import RegexValidator


class UserLoginForm(forms.Form):
    """Login form to use for authentication"""
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput)


class UserRegistrationForm(forms.ModelForm):
    """ User Registration Form"""
    password1 = forms.CharField(label='Password', widget=forms.PasswordInput)
    password2 = forms.CharField(label='Repeat password', widget=forms.PasswordInput)
    phone_number_validator = RegexValidator(regex=r'^\+?1?\d{9,15}$',
                                            message="Phone number must be entered in the format: '+999999999'. Up to "
                                                    "15 digits "
                                                    "allowed.")
    phone_number = forms.CharField(validators=[phone_number_validator], max_length=17)

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'phone_number')

    def clean_password(self):
        credentials = self.cleaned_data
        if credentials['password'] != credentials['password2']:
            raise forms.ValidationError('Passwords don\'t match.')
        return credentials['password2']
