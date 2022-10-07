from django import forms
from .models import Eithers, Comment

class EithersForm(forms.ModelForm):
    
    class Meta:
        model = Eithers
        fields = '__all__'

class CommentForm(forms.ModelForm):
    CATEGORY_CHOICE = (
        ('rgb(248,215,218)','RED'),
        ('rgb(207,226,255)','BLUE'),
    )
    pick = forms.ChoiceField(choices=CATEGORY_CHOICE)
    content = forms.CharField()
    class Meta:
        model = Comment
        exclude = ('eithers',)