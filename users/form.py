from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserCreationForm

User = get_user_model()


class UserCreationForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = User
        fields = ('first_name', 'last_name', 'username', 'email', 'password1', 'password2')
        labels = {
            'username':'Имя пользователя (логин)',
            'first_name': 'Имя',
            'password1': 'Имя пользователя (логин)',
            'first_name': 'Имя',
        }


