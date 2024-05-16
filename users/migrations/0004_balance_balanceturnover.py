# Generated by Django 5.0.6 on 2024-05-15 19:05

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_remove_indicator_id_alter_indicator_code'),
    ]

    operations = [
        migrations.CreateModel(
            name='Balance',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('period', models.DateField()),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='BalanceTurnover',
            fields=[
                ('id_turnover', models.AutoField(primary_key=True, serialize=False)),
                ('value', models.DecimalField(decimal_places=2, max_digits=10)),
                ('period', models.DateField()),
                ('balance', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.balance')),
                ('indicator', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.indicator')),
            ],
        ),
    ]
