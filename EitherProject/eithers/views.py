from django.shortcuts import render, redirect
from .forms import EithersForm, CommentForm
from .models import Eithers, Comment

# Create your views here.
def to_main(request):
    return redirect('eithers:index')

def index(request):
    articles = Eithers.objects.all()
    context = {
        'articles': articles,
    }
    return render(request, 'eithers/index.html', context)

def create(request):
    if request.method == 'POST':
        form = EithersForm(request.POST)
        article = form.save()
        return redirect('eithers:detail', article.pk)
    else:
        form = EithersForm()
    context = {
        'form': form,
    }
    return render(request, 'eithers/create.html', context)

def detail(request, pk):
    article = Eithers.objects.get(pk=pk)
    article.issue_a_vote *= 100
    article.issue_b_vote *= 100
    if request.method == 'POST':
        form = CommentForm(request.POST)
        comment = form.save(commit=False)
        if comment.pick == "RED":
            article.issue_a_vote += 1
        else:
            article.issue_b_vote += 1
        comment.eithers_id = article.pk
        comment.save()
        article.save()
        return redirect('eithers:detail', article.pk)
    form = CommentForm()
    comments = article.comment_set.all()
    context = {
        'article': article,
        'form': form,
        'comments': comments,
    }
    return render(request, 'eithers/detail.html', context)