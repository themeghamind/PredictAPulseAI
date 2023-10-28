from django.db import models


class Patient(models.Model):
    patient_id = models.CharField(max_length=20, primary_key=True)
    age_encoded = models.BooleanField()
    sex_encoded = models.BooleanField()


class Cholesterol(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    cholesterol_encoded = models.BooleanField()


class Smoking(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    smoking = models.BooleanField()


class BloodPressure(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    bp_encoded = models.BooleanField()


class Diabetes(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    diabetes = models.BooleanField()


class Obesity(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    obesity = models.BooleanField()


class HeartAttackRisk(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    heart_attack_risk = models.BooleanField()
