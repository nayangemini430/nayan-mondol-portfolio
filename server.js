// server.ts
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var contactMessages = [];
var consultationBookings = [];
var drugDatabase = {
  paracetamol: {
    generic: "Paracetamol (Acetaminophen)",
    brandNames: ["Napa", "Ace", "Fast", "Renova", "Pyrex"],
    category: "Analgesic & Antipyretic",
    categoryBn: "\u09AC\u09CD\u09AF\u09A5\u09BE\u09A8\u09BE\u09B6\u0995 \u0993 \u099C\u09CD\u09AC\u09B0 \u09AA\u09CD\u09B0\u09B6\u09AE\u0995",
    timingBn: "\u09AD\u09B0\u09BE \u09AA\u09C7\u099F\u09C7 \u09AC\u09BE \u0996\u09BE\u09B2\u09BF \u09AA\u09C7\u099F\u09C7 \u09B8\u09C7\u09AC\u09A8 \u0995\u09B0\u09BE \u09AF\u09BE\u09DF, \u09A4\u09AC\u09C7 \u09AD\u09B0\u09BE \u09AA\u09C7\u099F\u09C7 \u09B8\u09C7\u09AC\u09A8 \u09AA\u09C7\u099F\u09C7\u09B0 \u099C\u09A8\u09CD\u09AF \u0986\u09B0\u09BE\u09AE\u09A6\u09BE\u09DF\u0995\u0964",
    timingEn: "Can be taken with or without food. Taking after meals reduces mild stomach upset.",
    warningBn: "\u09A6\u09C8\u09A8\u09BF\u0995 \u09B8\u09B0\u09CD\u09AC\u09CB\u099A\u09CD\u099A \u09EA \u0997\u09CD\u09B0\u09BE\u09AE\u09C7\u09B0 (\u09EE\u099F\u09BF \u09EB\u09E6\u09E6 \u09AE\u09BF.\u0997\u09CD\u09B0\u09BE. \u099F\u09CD\u09AF\u09BE\u09AC\u09B2\u09C7\u099F) \u09AC\u09C7\u09B6\u09BF \u09B8\u09C7\u09AC\u09A8 \u0995\u09B0\u09AC\u09C7\u09A8 \u09A8\u09BE\u0964 \u0985\u09A4\u09BF\u09B0\u09BF\u0995\u09CD\u09A4 \u09B8\u09C7\u09AC\u09A8\u09C7 \u09B2\u09BF\u09AD\u09BE\u09B0\u09C7\u09B0 \u09AE\u09BE\u09B0\u09BE\u09A4\u09CD\u09AE\u0995 \u0995\u09CD\u09B7\u09A4\u09BF \u09B9\u09A4\u09C7 \u09AA\u09BE\u09B0\u09C7\u0964 \u0985\u09CD\u09AF\u09BE\u09B2\u0995\u09CB\u09B9\u09B2 \u09AA\u09B0\u09BF\u09B9\u09BE\u09B0 \u0995\u09B0\u09C1\u09A8\u0964",
    warningEn: "Do not exceed 4,000 mg (8 x 500mg tablets) in 24 hours. Risk of severe liver damage. Avoid alcohol.",
    counselingTipsBn: [
      "\u0985\u09A8\u09CD\u09AF\u09BE\u09A8\u09CD\u09AF \u0995\u09BE\u09B6\u09BF\u09B0 \u0993\u09B7\u09C1\u09A7 \u09AC\u09BE \u0995\u09AE\u09CD\u09AC\u09BF\u09A8\u09C7\u09B6\u09A8 \u09B8\u09BF\u09B0\u09BE\u09AA\u09C7 \u09AA\u09CD\u09AF\u09BE\u09B0\u09BE\u09B8\u09BF\u099F\u09BE\u09AE\u09B2 \u0986\u099B\u09C7 \u0995\u09BF\u09A8\u09BE \u09AF\u09BE\u099A\u09BE\u0987 \u0995\u09B0\u09C1\u09A8 (\u09A1\u09BE\u09AC\u09B2 \u09A1\u09CB\u099C \u098F\u09DC\u09BE\u09A4\u09C7)\u0964",
      "\u099C\u09CD\u09AC\u09B0 \u09E9 \u09A6\u09BF\u09A8\u09C7\u09B0 \u09AC\u09C7\u09B6\u09BF \u09B8\u09CD\u09A5\u09BE\u09DF\u09C0 \u09B9\u09B2\u09C7 \u09B0\u09C7\u099C\u09BF\u09B8\u09CD\u099F\u09BE\u09B0\u09CD\u09A1 \u099A\u09BF\u0995\u09BF\u09CE\u09B8\u0995\u09C7\u09B0 \u09AA\u09B0\u09BE\u09AE\u09B0\u09CD\u09B6 \u09A8\u09BF\u09A8\u0964",
      "\u09B2\u09BF\u09AD\u09BE\u09B0\u09C7\u09B0 \u0985\u09B8\u09C1\u0996 \u09A5\u09BE\u0995\u09B2\u09C7 \u09A1\u09BE\u0995\u09CD\u09A4\u09BE\u09B0\u09C7\u09B0 \u09A8\u09BF\u09B0\u09CD\u09A6\u09C7\u09B6 \u099B\u09BE\u09DC\u09BE \u09B8\u09C7\u09AC\u09A8 \u0995\u09B0\u09AC\u09C7\u09A8 \u09A8\u09BE\u0964"
    ],
    counselingTipsEn: [
      "Check other cold/cough combination medicines to avoid accidental duplicate dosing.",
      "Consult a doctor if fever persists for more than 3 consecutive days.",
      "Exercise caution if you have underlying hepatic/liver disorders."
    ]
  },
  omeprazole: {
    generic: "Omeprazole / Esomeprazole",
    brandNames: ["Seclo", "Losectil", "Maxpro", "Sergel", "Nexum"],
    category: "Proton Pump Inhibitor (PPI)",
    categoryBn: "\u0997\u09CD\u09AF\u09BE\u09B8\u09CD\u099F\u09CD\u09B0\u09BF\u0995 \u0985\u09CD\u09AF\u09BE\u09B8\u09BF\u09A1 \u09A8\u09BF\u09DF\u09A8\u09CD\u09A4\u09CD\u09B0\u09A3\u0995\u09BE\u09B0\u09C0 (\u09AA\u09BF\u09AA\u09BF\u0986\u0987)",
    timingBn: "\u09B8\u0995\u09BE\u09B2\u09C7 \u0996\u09BE\u09AC\u09BE\u09B0 \u0996\u09BE\u0993\u09DF\u09BE\u09B0 \u09E9\u09E6-\u09EC\u09E6 \u09AE\u09BF\u09A8\u09BF\u099F \u09AA\u09C2\u09B0\u09CD\u09AC\u09C7 \u09AD\u09B0\u09BE \u09AA\u09C7\u099F\u09C7 \u09A8\u09DF, \u0996\u09BE\u09B2\u09BF \u09AA\u09C7\u099F\u09C7 \u09AA\u09BE\u09A8\u09BF\u09B0 \u09B8\u09BE\u09A5\u09C7 \u0997\u09BF\u09B2\u09C7 \u0996\u09C7\u09A4\u09C7 \u09B9\u09AC\u09C7\u0964",
    timingEn: "Take 30 to 60 minutes before morning breakfast with a full glass of water. Swallow whole.",
    warningBn: "\u0995\u09CD\u09AF\u09BE\u09AA\u09B8\u09C1\u09B2 \u099A\u09BF\u09AC\u09BE\u09B2\u09C7 \u09AC\u09BE \u0997\u09C1\u0981\u09DC\u09CB \u0995\u09B0\u09B2\u09C7 \u0995\u09BE\u09B0\u09CD\u09AF\u0995\u09BE\u09B0\u09BF\u09A4\u09BE \u09A8\u09B7\u09CD\u099F \u09B9\u09DF\u0964 \u09A6\u09C0\u09B0\u09CD\u0998\u09AE\u09C7\u09DF\u09BE\u09A6\u09BF \u0985\u09A8\u09BF\u09AF\u09BC\u09A8\u09CD\u09A4\u09CD\u09B0\u09BF\u09A4 \u09AC\u09CD\u09AF\u09AC\u09B9\u09BE\u09B0\u09C7 \u0995\u09CD\u09AF\u09BE\u09B2\u09B8\u09BF\u09AF\u09BC\u09BE\u09AE \u0993 \u09AD\u09BF\u099F\u09BE\u09AE\u09BF\u09A8 B12 \u0998\u09BE\u099F\u09A4\u09BF \u09B9\u09A4\u09C7 \u09AA\u09BE\u09B0\u09C7\u0964",
    warningEn: "Do not crush or chew capsules. Chronic prolonged use can reduce Calcium and Vitamin B12 absorption.",
    counselingTipsBn: [
      "\u0996\u09BE\u09AC\u09BE\u09B0 \u0996\u09BE\u0993\u09DF\u09BE\u09B0 \u09A0\u09BF\u0995 \u0986\u0997\u09C7 \u09AC\u09BE \u09AA\u09B0\u09C7 \u0996\u09C7\u09B2\u09C7 \u0995\u09BE\u09B0\u09CD\u09AF\u0995\u09BE\u09B0\u09BF\u09A4\u09BE \u0985\u09A8\u09C7\u0995\u09BE\u0982\u09B6 \u0995\u09AE\u09C7 \u09AF\u09BE\u09DF\u0964",
      "\u09AA\u09CD\u09B0\u09DF\u09CB\u099C\u09A8 \u099B\u09BE\u09DC\u09BE \u09AE\u09BE\u09B8\u09C7\u09B0 \u09AA\u09B0 \u09AE\u09BE\u09B8 \u098F\u0995\u099F\u09BE\u09A8\u09BE \u0996\u09BE\u0993\u09DF\u09BE \u0989\u099A\u09BF\u09A4 \u09A8\u09DF; \u0996\u09BE\u09A6\u09CD\u09AF\u09A4\u09BE\u09B2\u09BF\u0995\u09BE\u09DF \u09A4\u09C8\u09B2\u09BE\u0995\u09CD\u09A4 \u0996\u09BE\u09AC\u09BE\u09B0 \u0995\u09AE\u09BE\u09A8\u0964",
      "\u0985\u09CD\u09AF\u09BE\u09A8\u09CD\u099F\u09BE\u09B8\u09BF\u09A1 \u09A8\u09C7\u0993\u09DF\u09BE\u09B0 \u09AA\u09CD\u09B0\u09DF\u09CB\u099C\u09A8 \u09B9\u09B2\u09C7 \u0985\u09A8\u09CD\u09A4\u09A4 \u09E8 \u0998\u09A3\u09CD\u099F\u09BE\u09B0 \u09AC\u09CD\u09AF\u09AC\u09A7\u09BE\u09A8 \u09B0\u09BE\u0996\u09C1\u09A8\u0964"
    ],
    counselingTipsEn: [
      "Taking it immediately after a meal significantly diminishes gastric acid suppression efficacy.",
      "Avoid unguided prolonged usage; adopt dietary improvements for acidity control.",
      "Space at least 2 hours apart from antacids if co-administered."
    ]
  },
  metformin: {
    generic: "Metformin Hydrochloride",
    brandNames: ["Comet", "Gluconor", "Insumin", "Metfo"],
    category: "Antidiabetic (Biguanide)",
    categoryBn: "\u09A1\u09BE\u09AF\u09BC\u09BE\u09AC\u09C7\u099F\u09BF\u09B8 \u09A8\u09BF\u09AF\u09BC\u09A8\u09CD\u09A4\u09CD\u09B0\u09A3\u0995\u09BE\u09B0\u09C0 \u0993\u09B7\u09C1\u09A7",
    timingBn: "\u0996\u09BE\u09AC\u09BE\u09B0\u09C7\u09B0 \u09A0\u09BF\u0995 \u09AE\u09BE\u099D\u09BE\u09AE\u09BE\u099D\u09BF \u09AC\u09BE \u0996\u09BE\u09AC\u09BE\u09B0\u09C7\u09B0 \u09B8\u09BE\u09A5\u09C7 \u09B8\u09BE\u09A5\u09C7 \u09B8\u09C7\u09AC\u09A8 \u0995\u09B0\u09C1\u09A8, \u0996\u09BE\u09B2\u09BF \u09AA\u09C7\u099F\u09C7 \u0995\u0996\u09A8\u0993 \u09A8\u09DF\u0964",
    timingEn: "Take with meals or immediately after meals to minimize gastrointestinal distress.",
    warningBn: "\u0996\u09BE\u09B2\u09BF \u09AA\u09C7\u099F\u09C7 \u0996\u09C7\u09B2\u09C7 \u0997\u09CD\u09AF\u09BE\u09B8\u09CD\u099F\u09CD\u09B0\u09BF\u0995 \u0993 \u09A1\u09BE\u09DF\u09B0\u09BF\u09DF\u09BE \u09B9\u09A4\u09C7 \u09AA\u09BE\u09B0\u09C7\u0964 \u09AA\u09BE\u09A8\u09BF\u09B6\u09C2\u09A8\u09CD\u09AF\u09A4\u09BE \u09A5\u09BE\u0995\u09B2\u09C7 \u099A\u09BF\u0995\u09BF\u09CE\u09B8\u0995\u09C7\u09B0 \u09AA\u09B0\u09BE\u09AE\u09B0\u09CD\u09B6 \u099B\u09BE\u09DC\u09BE \u0996\u09BE\u09AC\u09C7\u09A8 \u09A8\u09BE\u0964 \u09B0\u09C7\u09A8\u09BE\u09B2/\u0995\u09BF\u09A1\u09A8\u09BF \u09B8\u09AE\u09B8\u09CD\u09AF\u09BE \u09A5\u09BE\u0995\u09B2\u09C7 \u09A8\u09BF\u09DF\u09AE\u09BF\u09A4 \u09B8\u09BF\u09B0\u09BE\u09AE \u0995\u09CD\u09B0\u09BF\u09DF\u09C7\u099F\u09BF\u09A8\u09BF\u09A8 \u09AA\u09B0\u09C0\u0995\u09CD\u09B7\u09BE \u0995\u09B0\u09BE\u09A8\u0964",
    warningEn: "May cause nausea or diarrhea on empty stomach. Avoid during severe dehydration. Monitor renal function periodically.",
    counselingTipsBn: [
      "\u09A8\u09BF\u09AF\u09BC\u09AE\u09BF\u09A4 \u09AC\u09CD\u09B2\u09BE\u09A1 \u0997\u09CD\u09B2\u09C1\u0995\u09CB\u099C \u09AA\u09B0\u09CD\u09AF\u09AC\u09C7\u0995\u09CD\u09B7\u09A3 \u0995\u09B0\u09C1\u09A8 \u098F\u09AC\u0982 \u0993\u09B7\u09C1\u09A7\u09C7\u09B0 \u09B8\u09AE\u09AF\u09BC \u09AC\u099C\u09BE\u09AF\u09BC \u09B0\u09BE\u0996\u09C1\u09A8\u0964",
      "\u09AC\u09AE\u09BF\u09AD\u09BE\u09AC \u09B9\u09B2\u09C7 \u099F\u09CD\u09AF\u09BE\u09AC\u09B2\u09C7\u099F \u0996\u09BE\u09AC\u09BE\u09B0\u09C7\u09B0 \u09B6\u09C7\u09B7 \u09B2\u09CB\u0995\u09AE\u09BE\u09B0 \u09B8\u09BE\u09A5\u09C7 \u0997\u09CD\u09B0\u09B9\u09A3 \u0995\u09B0\u09C1\u09A8\u0964",
      "\u0985\u09CD\u09AF\u09BE\u09B2\u0995\u09CB\u09B9\u09B2 \u0997\u09CD\u09B0\u09B9\u09A3 \u09B8\u09AE\u09CD\u09AA\u09C2\u09B0\u09CD\u09A3\u09B0\u09C2\u09AA\u09C7 \u09AA\u09B0\u09BF\u09B9\u09BE\u09B0 \u0995\u09B0\u09C1\u09A8 (\u09B2\u09CD\u09AF\u09BE\u0995\u099F\u09BF\u0995 \u0985\u09CD\u09AF\u09BE\u09B8\u09BF\u09A1\u09CB\u09B8\u09BF\u09B8 \u099D\u09C1\u0981\u0995\u09BF \u09B0\u09CB\u09A7\u09C7)\u0964"
    ],
    counselingTipsEn: [
      "Monitor blood glucose regularly and maintain consistent timing daily.",
      "Taking with the largest meal helps prevent nausea and stomach discomfort.",
      "Strictly avoid alcohol to prevent rare lactic acidosis risks."
    ]
  },
  amlodipine: {
    generic: "Amlodipine Besylate",
    brandNames: ["Camlod", "Amlopin", "Amlovas", "Lodipin"],
    category: "Calcium Channel Blocker (Antihypertensive)",
    categoryBn: "\u0989\u099A\u09CD\u099A \u09B0\u0995\u09CD\u09A4\u099A\u09BE\u09AA \u09A8\u09BF\u09AF\u09BC\u09A8\u09CD\u09A4\u09CD\u09B0\u09A3\u0995\u09BE\u09B0\u09C0 \u0993\u09B7\u09C1\u09A7",
    timingBn: "\u09AA\u09CD\u09B0\u09A4\u09BF\u09A6\u09BF\u09A8 \u09A8\u09BF\u09B0\u09CD\u09A6\u09BF\u09B7\u09CD\u099F \u09B8\u09AE\u09DF\u09C7 (\u09B8\u0995\u09BE\u09B2\u09C7 \u0985\u09A5\u09AC\u09BE \u09B0\u09BE\u09A4\u09C7) \u09B8\u09C7\u09AC\u09A8 \u0995\u09B0\u09C1\u09A8\u0964 \u0996\u09BE\u09AC\u09BE\u09B0\u09C7\u09B0 \u09B8\u09BE\u09A5\u09C7 \u09AC\u09BE \u0996\u09BE\u09AC\u09BE\u09B0 \u099B\u09BE\u09DC\u09BE\u0993 \u0996\u09BE\u0993\u09DF\u09BE \u09AF\u09BE\u09DF\u0964",
    timingEn: "Take at the same time each day (morning or night), with or without food.",
    warningBn: "\u09B9\u09A0\u09BE\u09CE \u0993\u09B7\u09C1\u09A7 \u0996\u09BE\u0993\u09DF\u09BE \u09AC\u09A8\u09CD\u09A7 \u0995\u09B0\u09AC\u09C7\u09A8 \u09A8\u09BE, \u098F\u09A4\u09C7 \u09B0\u0995\u09CD\u09A4\u099A\u09BE\u09AA \u09AC\u09BF\u09AA\u099C\u09CD\u099C\u09A8\u0995\u09AD\u09BE\u09AC\u09C7 \u09AC\u09C3\u09A6\u09CD\u09A7\u09BF \u09AA\u09C7\u09A4\u09C7 \u09AA\u09BE\u09B0\u09C7\u0964 \u09AA\u09BE\u09DF\u09C7\u09B0 \u0997\u09CB\u09DC\u09BE\u09B2\u09BF\u09A4\u09C7 \u09AB\u09CB\u09B2\u09BE\u09AD\u09BE\u09AC (P\u8173dema) \u09A6\u09C7\u0996\u09BE \u09A6\u09BF\u09B2\u09C7 \u099A\u09BF\u0995\u09BF\u09CE\u09B8\u0995\u0995\u09C7 \u099C\u09BE\u09A8\u09BE\u09A8\u0964",
    warningEn: "Do not abruptly discontinue; may cause rebound hypertension. Report pedal ankle swelling.",
    counselingTipsBn: [
      "\u09AC\u09B8\u09BE \u09AC\u09BE \u09B6\u09CB\u09DF\u09BE \u09A5\u09C7\u0995\u09C7 \u09B9\u09A0\u09BE\u09CE \u09A6\u09CD\u09B0\u09C1\u09A4 \u0989\u09A0\u09C7 \u09A6\u09BE\u0981\u09DC\u09BE\u09AC\u09C7\u09A8 \u09A8\u09BE (\u09AE\u09BE\u09A5\u09BE \u0998\u09CB\u09B0\u09BE\u09A8\u09CB \u098F\u09DC\u09BE\u09A4\u09C7)\u0964",
      "\u09AA\u09CD\u09B0\u09A4\u09BF\u09A6\u09BF\u09A8 \u09B0\u0995\u09CD\u09A4\u099A\u09BE\u09AA \u09B0\u09C7\u0995\u09B0\u09CD\u09A1 \u09B0\u09BE\u0996\u09C1\u09A8\u0964",
      "\u09B2\u09AC\u09A3 \u0996\u09BE\u0993\u09DF\u09BE \u09A8\u09BF\u09DF\u09A8\u09CD\u09A4\u09CD\u09B0\u09A3 \u0995\u09B0\u09C1\u09A8\u0964"
    ],
    counselingTipsEn: [
      "Rise slowly from sitting or lying down to avoid orthostatic dizziness.",
      "Keep a weekly home blood pressure log.",
      "Maintain dietary sodium restriction."
    ]
  },
  azithromycin: {
    generic: "Azithromycin Dihydrate",
    brandNames: ["Zimax", "Rozith", "A-One", "Azith"],
    category: "Macrolide Antibiotic",
    categoryBn: "\u09AE\u09CD\u09AF\u09BE\u0995\u09CD\u09B0\u09CB\u09B2\u09BE\u0987\u09A1 \u0985\u09CD\u09AF\u09BE\u09A8\u09CD\u099F\u09BF\u09AC\u09BE\u09AF\u09BC\u09CB\u099F\u09BF\u0995",
    timingBn: "\u0996\u09BE\u09AC\u09BE\u09B0\u09C7\u09B0 \u09E7 \u0998\u09A3\u09CD\u099F\u09BE \u0986\u0997\u09C7 \u0985\u09A5\u09AC\u09BE \u0996\u09BE\u09AC\u09BE\u09B0\u09C7\u09B0 \u09E8 \u0998\u09A3\u09CD\u099F\u09BE \u09AA\u09B0\u09C7 \u09B8\u09C7\u09AC\u09A8 \u0989\u09A4\u09CD\u09A4\u09AE (\u0995\u09BF\u099B\u09C1 \u09B8\u09BE\u09B8\u09AA\u09C7\u09A8\u09B6\u09A8 \u0996\u09BE\u09AC\u09BE\u09B0\u09C7\u09B0 \u09B8\u09BE\u09A5\u09C7\u0993 \u0996\u09BE\u0993\u09DF\u09BE \u09AF\u09BE\u09DF)\u0964",
    timingEn: "Best taken 1 hour before or 2 hours after meals with a glass of water.",
    warningBn: "\u099A\u09BF\u0995\u09BF\u09CE\u09B8\u0995\u09C7\u09B0 \u09A8\u09BF\u09B0\u09CD\u09A6\u09C7\u09B6\u09BF\u09A4 \u0985\u09CD\u09AF\u09BE\u09A8\u09CD\u099F\u09BF\u09AC\u09BE\u09AF\u09BC\u09CB\u099F\u09BF\u0995\u09C7\u09B0 \u09AA\u09C1\u09B0\u09CB \u0995\u09CB\u09B0\u09CD\u09B8 (\u09B8\u09BE\u09A7\u09BE\u09B0\u09A3\u09A4 \u09E9-\u09EB \u09A6\u09BF\u09A8) \u09B6\u09C7\u09B7 \u0995\u09B0\u09C1\u09A8\u0964 \u09B2\u0995\u09CD\u09B7\u09A3 \u09AD\u09BE\u09B2\u09CB \u09B9\u09B2\u09C7\u0993 \u09AE\u09BE\u099D\u09AA\u09A5\u09C7 \u09AC\u09A8\u09CD\u09A7 \u0995\u09B0\u09AC\u09C7\u09A8 \u09A8\u09BE; \u098F\u09A4\u09C7 \u0985\u09CD\u09AF\u09BE\u09A8\u09CD\u099F\u09BF\u09AC\u09BE\u09AF\u09BC\u09CB\u099F\u09BF\u0995 \u09B0\u09C7\u099C\u09BF\u09B8\u09CD\u099F\u09CD\u09AF\u09BE\u09A8\u09CD\u09B8 \u09A4\u09C8\u09B0\u09BF \u09B9\u09DF\u0964",
    warningEn: "Complete the entire prescribed antibiotic course (typically 3 to 5 days). Never stop early to prevent microbial resistance.",
    counselingTipsBn: [
      "\u0985\u09CD\u09AF\u09BE\u09A8\u09CD\u099F\u09BE\u09B8\u09BF\u09A1\u09C7\u09B0 \u09B8\u09BE\u09A5\u09C7 \u098F\u0995\u09B8\u0999\u09CD\u0997\u09C7 \u09B8\u09C7\u09AC\u09A8 \u0995\u09B0\u09AC\u09C7\u09A8 \u09A8\u09BE (\u09E8 \u0998\u09A3\u09CD\u099F\u09BE\u09B0 \u09AC\u09CD\u09AF\u09AC\u09A7\u09BE\u09A8 \u09B0\u09BE\u0996\u09C1\u09A8)\u0964",
      "\u09AA\u09CD\u09B0\u09A4\u09BF\u09A6\u09BF\u09A8 \u098F\u0995\u0987 \u09B8\u09AE\u09DF\u09C7 \u09B8\u09C7\u09AC\u09A8 \u09A8\u09BF\u09B6\u09CD\u099A\u09BF\u09A4 \u0995\u09B0\u09C1\u09A8\u0964",
      "\u09AC\u09BE\u0995\u09BF \u09A5\u09BE\u0995\u09BE \u0985\u09CD\u09AF\u09BE\u09A8\u09CD\u099F\u09BF\u09AC\u09BE\u09AF\u09BC\u09CB\u099F\u09BF\u0995 \u0985\u09A8\u09CD\u09AF \u0995\u09BE\u0989\u0995\u09C7 \u09AC\u09CD\u09AF\u09AC\u09B9\u09BE\u09B0\u09C7\u09B0 \u09AA\u09B0\u09BE\u09AE\u09B0\u09CD\u09B6 \u09A6\u09C7\u09AC\u09C7\u09A8 \u09A8\u09BE\u0964"
    ],
    counselingTipsEn: [
      "Do not take with aluminum or magnesium antacids simultaneously.",
      "Ensure strict adherence to once-daily dosing timing.",
      "Never share leftover antibiotic doses with others."
    ]
  },
  montelukast: {
    generic: "Montelukast Sodium",
    brandNames: ["Monas", "Provair", "Montene", "Lumas"],
    category: "Leukotriene Receptor Antagonist (Anti-asthmatic / Anti-allergy)",
    categoryBn: "\u0985\u09CD\u09AF\u09BE\u09B2\u09BE\u09B0\u09CD\u099C\u09BF \u0993 \u09B6\u09CD\u09AC\u09BE\u09B8\u0995\u09B7\u09CD\u099F \u09A8\u09BF\u09B0\u09CB\u09A7\u0995 \u0993\u09B7\u09C1\u09A7",
    timingBn: "\u09B8\u09BE\u09A7\u09BE\u09B0\u09A3\u09A4 \u09AA\u09CD\u09B0\u09A4\u09BF\u09A6\u09BF\u09A8 \u09B0\u09BE\u09A4\u09C7 \u0998\u09C1\u09AE\u09BE\u09A8\u09CB\u09B0 \u09AA\u09C2\u09B0\u09CD\u09AC\u09C7 \u0996\u09BE\u09AC\u09BE\u09B0\u09C7\u09B0 \u09B8\u09BE\u09A5\u09C7 \u09AC\u09BE \u099B\u09BE\u09DC\u09BE \u09B8\u09C7\u09AC\u09A8 \u0995\u09B0\u09A4\u09C7 \u09B9\u09DF\u0964",
    timingEn: "Usually taken once daily in the evening, with or without food.",
    warningBn: "\u098F\u099F\u09BF \u099C\u09B0\u09C1\u09B0\u09BF \u0985\u09CD\u09AF\u09BE\u099C\u09AE\u09BE \u0985\u09CD\u09AF\u09BE\u099F\u09BE\u0995\u09C7\u09B0 \u09A4\u09BE\u09CE\u0995\u09CD\u09B7\u09A3\u09BF\u0995 \u0989\u09AA\u09B6\u09AE\u0995\u09BE\u09B0\u09C0 \u09A8\u09DF (\u0987\u09A8\u09B9\u09C7\u09B2\u09BE\u09B0 \u09AA\u09CD\u09B0\u09DF\u09CB\u099C\u09A8)\u0964 \u098F\u099F\u09BF \u09A6\u09C0\u09B0\u09CD\u0998\u09AE\u09C7\u09DF\u09BE\u09A6\u09C0 \u09A8\u09BF\u09DF\u09A8\u09CD\u09A4\u09CD\u09B0\u09A3\u0995\u09BE\u09B0\u09C0 \u0993\u09B7\u09C1\u09A7\u0964 \u09AE\u09C7\u099C\u09BE\u099C\u09C7\u09B0 \u0986\u0995\u09B8\u09CD\u09AE\u09BF\u0995 \u09AA\u09B0\u09BF\u09AC\u09B0\u09CD\u09A4\u09A8 \u09B2\u0995\u09CD\u09B7\u09CD\u09AF \u0995\u09B0\u09B2\u09C7 \u09A1\u09BE\u0995\u09CD\u09A4\u09BE\u09B0\u0995\u09C7 \u099C\u09BE\u09A8\u09BE\u09A8\u0964",
    warningEn: "Not a rescue inhaler for acute bronchospasms. Regular controller therapy. Report sudden neuro-psychiatric mood changes.",
    counselingTipsBn: [
      "\u09A8\u09BF\u09DF\u09AE\u09BF\u09A4 \u0996\u09C7\u09B2\u09C7 \u09B6\u09CD\u09AC\u09BE\u09B8\u0995\u09B7\u09CD\u099F \u0993 \u0985\u09CD\u09AF\u09BE\u09B2\u09BE\u09B0\u09CD\u099C\u09BF\u0995 \u09B0\u09BE\u0987\u09A8\u09BE\u0987\u099F\u09BF\u09B8 \u09A8\u09BF\u09DF\u09A8\u09CD\u09A4\u09CD\u09B0\u09A3\u09C7 \u09A5\u09BE\u0995\u09C7\u0964",
      "\u099A\u09BF\u0989\u09DF\u09C7\u09AC\u09B2 \u099F\u09CD\u09AF\u09BE\u09AC\u09B2\u09C7\u099F \u09B9\u09B2\u09C7 \u099A\u09BF\u09AC\u09BF\u09DF\u09C7 \u0996\u09C7\u09A4\u09C7 \u09B9\u09AC\u09C7\u0964",
      "\u09A7\u09C1\u09B2\u09CB\u09AC\u09BE\u09B2\u09BF \u0993 \u0985\u09CD\u09AF\u09BE\u09B2\u09BE\u09B0\u09CD\u099C\u09BF \u0989\u09A6\u09CD\u09B0\u09C7\u0995\u0995\u09BE\u09B0\u09C0 \u09AA\u09B0\u09BF\u09AC\u09C7\u09B6 \u09AA\u09B0\u09BF\u09B9\u09BE\u09B0 \u0995\u09B0\u09C1\u09A8\u0964"
    ],
    counselingTipsEn: [
      "Consistent nightly usage keeps allergic rhinitis and asthma under stable control.",
      "Chewable tablets must be chewed completely before swallowing.",
      "Avoid common allergen triggers like dust and smoke."
    ]
  }
};
async function createServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3e3;
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      service: "Nayan Mondol Healthcare & Pharmacy Portal",
      runtime: "Node.js",
      nodeVersion: process.version,
      platform: process.platform,
      uptimeSeconds: Math.floor(process.uptime()),
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      activeFeatures: [
        "Prescription Guidance API",
        "Appointment Booking Engine",
        "Drug Interaction Checker",
        "Patient Inquiry Handler"
      ]
    });
  });
  app.get("/api/profile", (_req, res) => {
    res.json({
      success: true,
      pharmacist: {
        name: "Nayan Mondol",
        nameBn: "\u09A8\u09AF\u09BC\u09A8 \u09AE\u09A8\u09CD\u09A1\u09B2",
        role: "Sales Executive & Pharmacy Retail Specialist",
        roleBn: "\u09B8\u09C7\u09B2\u09B8 \u098F\u0995\u09CD\u09B8\u09BF\u0995\u09BF\u0989\u099F\u09BF\u09AD \u0993 \u09AB\u09BE\u09B0\u09CD\u09AE\u09C7\u09B8\u09BF \u09B0\u09BF\u099F\u09C7\u0987\u09B2 \u09B8\u09CD\u09AA\u09C7\u09B6\u09BE\u09B2\u09BF\u09B8\u09CD\u099F",
        registrationNumber: "C-Reg: 54921 (Pharmacy Council of Bangladesh)",
        experienceSince: 2017,
        currentYear: 2026,
        totalExperienceYears: 9,
        primaryPhone: "+880 1989 044092",
        cleanPhone: "01989044092",
        whatsappLink: "https://wa.me/8801989044092",
        email: "nayanmondol@example.com",
        location: {
          chamberBn: "\u09A6\u09BE\u0987\u09AF\u09BC\u09BE\u09A8 \u099F\u09BE\u0993\u09AF\u09BC\u09BE\u09B0 \u09AB\u09BE\u09B0\u09CD\u09AE\u09C7\u09B8\u09BF, \u09B6\u09B0\u09C0\u09AF\u09BC\u09A4\u09AA\u09C1\u09B0",
          chamberEn: "Daiyan Tower Pharmacy, Shariatpur",
          scheduleBn: "\u09B6\u09A8\u09BF\u09AC\u09BE\u09B0 \u2013 \u09AC\u09C3\u09B9\u09B8\u09CD\u09AA\u09A4\u09BF\u09AC\u09BE\u09B0: \u09B8\u0995\u09BE\u09B2 \u09EF:\u09E6\u09E6 \u2013 \u09B0\u09BE\u09A4 \u09E7\u09E6:\u09E9\u09E6 | \u09B6\u09C1\u0995\u09CD\u09B0\u09AC\u09BE\u09B0: \u09AC\u09BF\u0995\u09C7\u09B2 \u09EA:\u09E6\u09E6 \u2013 \u09B0\u09BE\u09A4 \u09E7\u09E6:\u09E6\u09E6",
          scheduleEn: "Sat \u2013 Thu: 9:00 AM \u2013 10:30 PM | Friday: 4:00 PM \u2013 10:00 PM"
        },
        stats: {
          patientsAdvised: "15,000+",
          prescriptionsAudited: "45,000+",
          communityCamps: "60+",
          safetyAccuracy: "99.9%"
        }
      }
    });
  });
  app.get("/api/contact", (_req, res) => {
    res.json({
      success: true,
      count: contactMessages.length,
      recentMessages: contactMessages.slice(-10).reverse()
    });
  });
  app.post("/api/contact", (req, res) => {
    const { name, phone, serviceType, message } = req.body;
    if (!name || !phone) {
      res.status(400).json({
        success: false,
        error: "Name and phone number are required."
      });
      return;
    }
    const newMessage = {
      id: `MSG-${Date.now()}-${Math.floor(Math.random() * 1e3)}`,
      name: String(name).trim(),
      phone: String(phone).trim(),
      serviceType: serviceType || "prescription-review",
      message: String(message || "").trim(),
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    contactMessages.push(newMessage);
    res.status(201).json({
      success: true,
      id: newMessage.id,
      message: "\u0986\u09AA\u09A8\u09BE\u09B0 \u09AC\u09BE\u09B0\u09CD\u09A4\u09BE \u09B8\u09AB\u09B2\u09AD\u09BE\u09AC\u09C7 \u0997\u09C3\u09B9\u09C0\u09A4 \u09B9\u09DF\u09C7\u099B\u09C7\u0964 \u0996\u09C1\u09AC \u09B6\u09C0\u0998\u09CD\u09B0\u0987 \u09A8\u09AF\u09BC\u09A8 \u09AE\u09A8\u09CD\u09A1\u09B2 \u0986\u09AA\u09A8\u09BE\u09B0 \u09B8\u09BE\u09A5\u09C7 \u09AF\u09CB\u0997\u09BE\u09AF\u09CB\u0997 \u0995\u09B0\u09AC\u09C7\u09A8\u0964",
      messageEn: "Your query has been recorded. Pharmacist Nayan Mondol will reach out shortly.",
      data: newMessage
    });
  });
  app.get("/api/consultations", (_req, res) => {
    res.json({
      success: true,
      count: consultationBookings.length,
      bookings: consultationBookings.slice(-10).reverse()
    });
  });
  app.post("/api/consultations", (req, res) => {
    const { name, phone, serviceType, preferredTime, notes } = req.body;
    if (!name || !phone) {
      res.status(400).json({
        success: false,
        error: "Name and phone number are mandatory."
      });
      return;
    }
    const newBooking = {
      id: `APT-${Date.now()}-${Math.floor(Math.random() * 1e3)}`,
      name: String(name).trim(),
      phone: String(phone).trim(),
      serviceType: serviceType || "Prescription Review & Counselling",
      preferredTime: preferredTime || "Morning (10:00 AM - 1:00 PM)",
      notes: String(notes || "").trim(),
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      status: "pending"
    };
    consultationBookings.push(newBooking);
    res.status(201).json({
      success: true,
      bookingId: newBooking.id,
      message: "\u0995\u09A8\u09B8\u09BE\u09B2\u099F\u09C7\u09B6\u09A8 \u0993 \u0985\u09CD\u09AF\u09BE\u09AA\u09AF\u09BC\u09C7\u09A8\u09CD\u099F\u09AE\u09C7\u09A8\u09CD\u099F \u0986\u09AC\u09C7\u09A6\u09A8 \u09B8\u09AB\u09B2\u09AD\u09BE\u09AC\u09C7 \u09A8\u09A5\u09BF\u09AD\u09C1\u0995\u09CD\u09A4 \u09B9\u09DF\u09C7\u099B\u09C7!",
      messageEn: "Consultation appointment application recorded successfully!",
      data: newBooking
    });
  });
  app.post("/api/drug-checker", (req, res) => {
    const { query } = req.body;
    const cleanQuery = String(query || "").toLowerCase().trim();
    if (!cleanQuery) {
      res.status(400).json({
        success: false,
        error: "Please specify a medicine name or symptom to search."
      });
      return;
    }
    let matchedKey = null;
    for (const [key, info] of Object.entries(drugDatabase)) {
      if (cleanQuery.includes(key) || key.includes(cleanQuery) || info.brandNames.some((b) => b.toLowerCase().includes(cleanQuery))) {
        matchedKey = key;
        break;
      }
    }
    if (matchedKey) {
      res.json({
        success: true,
        found: true,
        medicine: drugDatabase[matchedKey],
        contactCounselor: "+880 1989 044092"
      });
      return;
    }
    res.json({
      success: true,
      found: false,
      query: cleanQuery,
      generalGuidanceBn: "\u0993\u09B7\u09C1\u09A7\u099F\u09BF \u0986\u09AE\u09BE\u09A6\u09C7\u09B0 \u09AA\u09CD\u09B0\u09BE\u09A5\u09AE\u09BF\u0995 \u09A1\u09BE\u099F\u09BE\u09AC\u09C7\u099C\u09C7 \u09B8\u09B0\u09BE\u09B8\u09B0\u09BF \u09AA\u09BE\u0993\u09AF\u09BC\u09BE \u09AF\u09BE\u09AF\u09BC\u09A8\u09BF\u0964 \u09A4\u09AC\u09C7 \u09AF\u09C7\u0995\u09CB\u09A8\u09CB \u09AA\u09CD\u09B0\u09C7\u09B8\u0995\u09CD\u09B0\u09BF\u09AA\u09B6\u09A8 \u0993\u09B7\u09C1\u09A7\u09C7\u09B0 \u09B8\u09A0\u09BF\u0995 \u09A1\u09CB\u099C, \u09AA\u09BE\u09B0\u09CD\u09B6\u09CD\u09AC\u09AA\u09CD\u09B0\u09A4\u09BF\u0995\u09CD\u09B0\u09BF\u09DF\u09BE \u098F\u09AC\u0982 \u0985\u09A8\u09CD\u09AF\u09BE\u09A8\u09CD\u09AF \u0993\u09B7\u09C1\u09A7\u09C7\u09B0 \u09B8\u09BE\u09A5\u09C7 \u09AE\u09BF\u09A5\u09B8\u09CD\u0995\u09CD\u09B0\u09BF\u09AF\u09BC\u09BE \u09AF\u09BE\u099A\u09BE\u0987 \u0995\u09B0\u09A4\u09C7 \u09B8\u09B0\u09BE\u09B8\u09B0\u09BF \u0986\u09AE\u09BE\u09A6\u09C7\u09B0 \u09B8\u09BE\u09A5\u09C7 \u09AF\u09CB\u0997\u09BE\u09AF\u09CB\u0997 \u0995\u09B0\u09C1\u09A8\u0964",
      generalGuidanceEn: "Medicine was not found in the instant quick-database. For personalized dose calculation and drug interaction review, contact Pharmacist Nayan Mondol.",
      counselingPhone: "+880 1989 044092",
      whatsappUrl: `https://wa.me/8801989044092?text=${encodeURIComponent(`\u0986\u09B8\u09B8\u09BE\u09B2\u09BE\u09AE\u09C1 \u0986\u09B2\u09BE\u0987\u0995\u09C1\u09AE, \u0986\u09AE\u09BF '${cleanQuery}' \u0993\u09B7\u09C1\u09A7\u099F\u09BF\u09B0 \u09A1\u09CB\u099C \u0993 \u09AA\u09BE\u09B0\u09CD\u09B6\u09CD\u09AC\u09AA\u09CD\u09B0\u09A4\u09BF\u0995\u09CD\u09B0\u09BF\u09AF\u09BC\u09BE \u09B8\u09AE\u09CD\u09AA\u09B0\u09CD\u0995\u09C7 \u099C\u09BE\u09A8\u09A4\u09C7 \u099A\u09BE\u0987\u0964`)}`
    });
  });
  app.get("/api/medicines", (_req, res) => {
    const list = Object.entries(drugDatabase).map(([key, data]) => ({
      key,
      generic: data.generic,
      brands: data.brandNames,
      categoryBn: data.categoryBn
    }));
    res.json({ success: true, count: list.length, medicines: list });
  });
  if (process.env.NODE_ENV === "production") {
    const distPath = path.resolve(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.resolve(distPath, "index.html"));
    });
  } else {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`\u{1F680} Node.js Server active at http://0.0.0.0:${PORT}`);
    console.log(`\u{1F4E6} Node.js Environment: ${process.env.NODE_ENV || "development"}`);
  });
}
createServer().catch((err) => {
  console.error("Failed to start Node.js server:", err);
  process.exit(1);
});
