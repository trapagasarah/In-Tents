from rest_framework import viewsets 
from .serializer import CampsiteSerializer, TripSerializer, GearSerializer, ChecklistItemSerializer
from .models import Campsite, Trip, Gear, ChecklistItem
from django.shortcuts import render
import requests
from django.http import JsonResponse
                                                 
class CampsiteViewSet(viewsets.ModelViewSet):
    queryset = Campsite.objects.all()
    serializer_class = CampsiteSerializer
    
class TripViewSet(viewsets.ModelViewSet):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer

class GearViewSet(viewsets.ModelViewSet):
    queryset = Gear.objects.all()
    serializer_class = GearSerializer

class ChecklistItemViewSet(viewsets.ModelViewSet):
    queryset = ChecklistItem.objects.all()
    serializer_class = ChecklistItemSerializer

# class PlacesViewSet(viewsets.ViewSet):
#     serializer_class = 
#     def list(self, request):
#         data  =  {
#             test: "test"
#         } 
#         return JsonResponse(data, safe=false)



# def home(request):
#     response = requests.get('http://freegeoip.net/json/')
#     geodata = response.json()
#     return render(request, 'core/home.html', {
#         'ip': geodata['ip'],
#         'country': geodata['country_name']
#     })