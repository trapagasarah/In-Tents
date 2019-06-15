from rest_framework import viewsets 
from .serializer import CampsiteSerializer, TripSerializer, GearSerializer, ChecklistItemSerializer
from .models import Campsite, Trip, Gear, ChecklistItem
from django.shortcuts import render
import requests 
from django.http import JsonResponse,  HttpResponse
from django.views import View
from decouple import config


apiKey = config("IN_TENTS_GOOGLE_SECRET_KEY")
                                              
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

class PlaceView(View):
    def get(self, request, *args, **kwargs):
        lat = request.GET['lat']
        lng = request.GET['lng']
        response = requests.get(f"https://maps.googleapis.com/maps/api/place/textsearch/json?key={apiKey}&type=campground&location={lat},{lng}&radiuis=50000")
        json = response.json()
        return JsonResponse(json, safe=False)
        