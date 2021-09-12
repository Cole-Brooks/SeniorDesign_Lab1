import os

from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse_lazy
from .forms import UserLoginForm, UserRegistrationForm
from django.conf import settings
from twilio.rest import Client

# Create your views here.



def home(request):
    """Return home page"""
    if request.user.is_authenticated:
        return HttpResponseRedirect(reverse_lazy('data_list'))
    return render(request, template_name='home.html')


def user_login_view(request):
    """Render custom Log in view when requested"""

    if request.method == 'POST':
        form = UserLoginForm(request.POST)
        if form.is_valid():
            credentials = form.cleaned_data
            user = authenticate(request, password=credentials['password'], username=credentials['username'])

            if user is not None:
                if user.is_active:
                    login(request, user)
                    return redirect('data_list')
                else:
                    return HttpResponse('Disabled account')
            else:
                return HttpResponse('Invalid login')
    else:
        form = UserLoginForm()
    return render(request, 'accounts/login.html', {'form': form})


def user_registration(request):
    """Process users registration when requested"""
    if request.method == 'POST':

        user_form = UserRegistrationForm(request.POST)

        if user_form.is_valid():
            new_user = user_form.save(commit=False)
            new_user.set_password(user_form.cleaned_data['password1'])
            new_user.save()

            login(request, new_user)
            return HttpResponseRedirect(reverse_lazy('home'))

    else:
        user_form = UserRegistrationForm()
    return render(request, 'registration/user_registration.html', {'user_form': user_form})


def data_list(request):
    """Views for all the data taken by the user"""
    return render(request, template_name='data/list.html')


"""def maximum_alert(request):

    TWILIO_ACCOUNT_SID = "AC967aa15506c58aeab1848fc5d95d1a38"
    TWILIO_AUTH_TOKEN = "0180f8afd46a29507edda9f3010b47ff"
    TWILIO_NUMBER = "+19169434793"
    SMS_BROADCAST_TO_NUMBERS = [
        "+13195123399",  # use the format +19735551234
        "",
        "",
    ]

    message_to_broadcast = "Are you getting my texts?"
    client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
    for recipient in SMS_BROADCAST_TO_NUMBERS:
        if recipient:
            client.messages.create(to=recipient,
                                   from_=TWILIO_NUMBER,
                                   body=message_to_broadcast)
    return HttpResponse("messages sent!", 200)
"""