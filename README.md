# ✈️ TravelBuddy

## 🚀 Overview
TravelBuddy is a mobile application created by travellers, for travellers as an all-in-one travel essentials application to address all your travelling needs and provide a seamless and stress-free travel planning experience for its users.

Manage your upcoming trips by planning and generating itineraries, finding the best flight and accommodation options online and handling your trip budgetting from within the application itself.

TravelBuddy was developed as a summer project for NUS Orbital in AY23/24, and attained the second highest level of achievement - Apollo 11. Deliverables such as the detailed documentation, project poster and video can be found [here](https://drive.google.com/drive/folders/1bS8eLzZfYxZjLJGYiSQYLUgSQpVV_WsL).

## 📋 Setup Instructions
1. Download the [apk](https://drive.google.com/file/d/1niVip-SiW1kRhEAOXLeWWLhsqoU4Hlte/view) for TravelBuddy
2. Set up a virtual Android Device using an emulator (eg. Android Studio)
3. Run the apk in the virtual device

## 🤖 Tech Stack
- React Native - Used to build the application frontend
- Supabase - Used as the app's database and backend
- TypeScript - The language used to code our app
- TailwindCSS - Used for styling of the app components
- Claude API - Used to generate itineraries for users
- SkyScanner & BookingCom APIs - Used to scrape flights and accommodation at destination countries online
- Google Maps API - Used for in-app maps and navigation display

## 🌟 Features
- **User Authentication**:
  
  Register for an account and verify your identity through an OTP sent to your email by our third party authenticator service, Clerk

- **Trip Planning**:

  Track all your upcoming trips by logging your trip details and adding them to the home page view

- **Travel Groups**:

  Add your friends into your created trips using a unique generated invite code, or invite other solo travellers to your trip through the find travellers interface
  
- **Itinerary Planning & Generation**:

  Plan your trip itinerary by adding individual itinerary items manually, or generate a full travel itinerary for your trip by using our built in itinerary generator powered by Claude API

- **Flight & Accommodation Finder**:

  Source the best flight & accommodation prices to your destination country using our flight & accommodation scrapers

- **Budget Tracking & Expense Splitting**:

  Track your overall trip expenditure and split shared expenses among your group members easily with our app's budget and expense tracker

- **Maps & Navigation**:

  Find the shortest route to your destination by using our in-app map and navigation service provided by Google Maps API

  
