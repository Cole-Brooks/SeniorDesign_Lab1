from django.contrib import admin
from django.urls import path, include
from . import views
from django.contrib.auth import views as auth_views


# Customization of django admin
admin.site.site_header = "Senior Design Lab 1"
admin.site.site_title = "Welcome to Senior Design Lab 1's Dashboard"
admin.site.index_title = "Welcome to the Portal"

# Patterns of different paths
urlpatterns = [
    path('home/', views.home, name='home'),
    path('', views.home, name='home'),
    path('accounts/login/', views.user_login_view, name='user_login'),
    path('accounts/users/register/', views.user_registration, name='user_registration'),
    path('', include('django.contrib.auth.urls')),
    path('list/', views.data_list, name='data_list'),
    path('alert/', views.maximum_alert, name='alert'),
    # path('password_change/', auth_views.PasswordChangeView.as_view(template_name='registration/password_change_form'
    #                                                                          '.html'), name='password_change'),
    # path('password_change/done/', auth_views.PasswordChangeDoneView.as_view(template_name='registration'
    #                                                                                 '/password_change_done'),
    # name='password_change_done'),
    # path('password_reset', auth_views.PasswordResetView.as_view(),
    # name='password_reset'),
    # path('password_reset/done/', auth_views.PasswordResetDoneView.as_view(),
    #  name='password_reset_done'),
    # path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(),
    # name='password_reset_confirm'),
    # path('reset/done/', auth_views.PasswordResetCompleteView.as_view(),
    #   name='password_reset_complete'),
    path('', include('django.contrib.auth.urls')),
    # path('edit_profile/', views.edit_profile, name='edit_profile'),

]
