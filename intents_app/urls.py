from .views import CampsiteViewSet, TripViewSet, GearViewSet, ChecklistItemViewSet, PlaceView
from rest_framework import routers
from django.urls import include, path
                                             
router = routers.SimpleRouter()

router.register('campsites', CampsiteViewSet)
router.register('trips', TripViewSet)
router.register('gear', GearViewSet)
router.register('checklistitems', ChecklistItemViewSet)

urlpatterns = [
    path('places', PlaceView.as_view(), name='places'), 
]

urlpatterns += router.urls



