from rest_framework import serializers


class ResponseSerializer(serializers.Serializer):
    Code = serializers.IntegerField()
    Description = serializers.CharField(max_length=255)
    Data = serializers.JSONField()
