from django.shortcuts import render
def react(request):
    return render(request, "../react-app/build/index.html")
