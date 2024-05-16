from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect
from django.template.context_processors import request
from django.views import View

from users.form import UserCreationForm
from users.models import Indicator, IndicatorValue
from django.http import JsonResponse

def generate_report(request):
    if request.method == 'POST':
        # Получаем данные из POST-запроса
        data = request.POST
        # Здесь вы можете обработать данные и сгенерировать отчет
        # Верните JsonResponse с отчетом или любыми другими данными
        return JsonResponse({'success': True})
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)


# Create your views here.
def liquidity(request):
    return render(request, 'liquidity_calculator.html')
from django.contrib.auth.decorators import login_required
from django.shortcuts import render



@login_required
def save_indicator_values(request):
    if request.method == 'POST':
        print(request.POST)  # Вывод POST-данных для отладки
        for indicator in Indicator.objects.all():
            value = request.POST.get(f'indicator_{indicator.code}')
            if value is not None:
                IndicatorValue.objects.create(
                    user=request.user,
                    indicator=indicator,
                    value=value
                )
    return redirect('profile')

@login_required
def profile(request):
    indicator_values = IndicatorValue.objects.filter(user=request.user)
    return render(request, 'profile.html', {'indicator_values': indicator_values})


def your_view(request):
    indicators = Indicator.objects.all()
    return render(request, 'liquidity_calculator.html', {'indicators': indicators})


class Register(View):
    template_name = 'registration/register.html'

    def get(self, request):
        context = {
            'form': UserCreationForm()
        }
        return render(request, self.template_name, context)

    def post(self, request):
        form = UserCreationForm(request.POST)

        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=password)
            login(request, user)
            return redirect('home')
        context = {
            'form': form
        }
        return render(request, self.template_name, context)

