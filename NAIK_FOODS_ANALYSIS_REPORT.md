# 📊 Comprehensive Website Analysis & Product Recommendation Report
**Reference Website Studied**: [https://www.naikfoods.co.in/in](https://www.naikfoods.co.in/in)  
**Brand Studied**: Naik Foods (Authentic Maharashtrian Delicacies, Masalas, Pickles, & Snacks)  
**Prepared For**: Full Stack MERN Internship Task — BITS AND VOLTS PRIVATE LIMITED  
**Candidate Name**: Full Stack Developer Candidate  
**Date**: September 2026  

---

## 1. Executive Summary

Naik Foods operates a live e-commerce platform (`naikfoods.co.in/in`) and a physical flagship retail store in Shukrawar Peth, Pune. The brand specializes in authentic, hand-pounded Maharashtrian masalas (Godaa, Malvani, Kanda Lasun, Kolhapuri), sun-dried pickles (Shevga Drumstick, Kacchi Kairi), regional chutneys (Solapuri Shenga, Karale), snacks (Bhakarwadi), and farm staples representing Vidarbha, Konkan, Marathwada, and Western Maharashtra.

This document presents a structured, empirical **360-degree evaluation** of the reference website from both **User Experience (UX)** and **Developer (Technical, Performance, SEO, Security)** perspectives, establishes a prioritized problem matrix, justifies the selection of **ONE core feature**, and details the **Original MERN Stack Prototype ("SwadYatra")** developed to solve the identified opportunities.

---

## 2. Assignment Objective & Methodology

### Objective
Analyze a real-world live e-commerce website, identify actual UX friction points and technical performance bottlenecks, prioritize opportunities, select ONE meaningful feature to build, and deliver an **original MERN stack working prototype** (not a pixel-by-pixel website clone).

### Methodology
1. **Live Website Inspection**: Conducted structured user journeys across Desktop and Mobile viewports on `naikfoods.co.in/in`.
2. **Technical Audit**: Evaluated DOM architecture, asset optimization, response payloads, metadata tags, and accessibility contrast using browser developer tools.
3. **Problem & Priority Matrix**: Formulated a P0/P1/P2 priority matrix based on User Impact vs. Business Impact vs. Development Effort.
4. **Original Prototype Solution**: Designed and developed **"SwadYatra — Smart Regional Spice Discovery & Combo Engine"** using React 19, Vite, Express.js, and MongoDB.

---

## 3. User Perspective Analysis & Customer Journey

### Customer Journey Audit Matrix

| Stage | Observation on Reference Site | Identified Problem | Impact on User/Business | Recommendation | Priority |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1. Visitor Arrival** | Standard hero carousel & generic category grid | No explicit regional storytelling or heat level transparency | High bounce rate for first-time visitors seeking specific regional flavors | Introduce an interactive Regional Culinary Explorer | **P0** |
| **2. Search & Discovery** | Search returns text matches without spice level indicators | Customers cannot tell if a masala is Mild, Medium, or Fiery Hot | Buyers purchase incorrect spice intensity, causing dissatisfaction | Add visual Heat Meter peppers (1 to 4 scale) on product cards | **P0** |
| **3. Product Consideration** | Products sold as single standalone units only | No custom combo builder or festive gift box option | Lower Average Order Value (AOV); missed gifting revenue | Create "Build Your Own Box" custom combo wizard with instant discount | **P0** |
| **4. Product Decision** | Recipe pairing context is absent | Home cooks don't know exact steps to cook dishes with the masala | Abandoned carts due to uncertainty on usage | Integrate "Recipe-to-Cart" step-by-step cooking engine with 1-click cart add | **P1** |
| **5. Cart & Checkout** | Static cart drawer without progress indicators | Users don't know how much more to add for ₹999 Free Shipping | Cart abandonment before checkout completion | Add dynamic Free Shipping progress bar & promo code engine | **P1** |
| **6. Repeat Purchase** | Manual reordering required | No subscription model for monthly kitchen spice refills | Low customer retention rate | Offer 10% discount on monthly recurring spice subscriptions | **P2** |

---

## 4. Developer & Technical Perspective Analysis

### 4.1 Frontend Architecture & UX Engineering
- **Next.js SSR Hydration Bottlenecks**: The reference website relies heavily on Next.js App Router chunks with Emotion/MUI styling (`main-app.js`, `layout.js`), resulting in visible loading spinners and layout shift during initial mobile renders.
- **Loading & Empty States**: Missing skeleton loaders during image hydration.

### 4.2 Performance & Asset Optimization
- **Unoptimized Remote Images**: Product images served from remote Cloudinary storage lack modern `WebP` compression or explicit responsive `srcset` parameters, increasing total page payload size.
- **Unused CSS/JS Chunks**: Multiple preloaded MUI script tags add overhead to the main thread execution time.

### 4.3 SEO & Structured Data Audit
- **Missing Recipe & Product JSON-LD Schemas**: Pages omit rich Google schemas (`Schema.org/Recipe` and `Schema.org/Product` with ratings, currency `INR`, and in-stock availability).
- **Suboptimal Regional Meta Titles**: Title tags lack long-tail keywords like *"Buy Authentic Hand-Pounded Godaa Masala Online Pune"*.

### 4.4 Accessibility (a11y) & Security
- **Color Contrast**: Subtle gray text (`#585E61`) on light background fails WCAG AA 4.5:1 contrast ratio standards on smaller text nodes.
- **Security Considerations**: API endpoints should enforce rate limiting, CORS origin checks, and input sanitization to prevent XSS.

---

## 5. Priority Matrix of Opportunities

| Improvement / Feature | User Impact | Business Impact | Effort | Priority | Rationale |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Smart Regional Discovery & Custom Combo Builder** | **High** | **High** | **Medium** | **P0 (Selected)** | Directly solves product discovery friction and increases Average Order Value (AOV). |
| **Visual Heat Level Meter** | **High** | **High** | **Low** | **P0** | Eliminates spice level confusion for first-time buyers. |
| **Recipe-to-Cart Pairing Engine** | **Medium** | **High** | **Medium** | **P1** | Drives multi-item cross-selling and customer engagement. |
| **Dynamic Free Shipping Progress Bar** | **Medium** | **Medium** | **Low** | **P1** | Reduces cart abandonment at checkout. |
| **Monthly Spice Subscription Refill** | **Medium** | **Medium** | **High** | **P2** | Enhances long-term customer LTV (Lifetime Value). |

---

## 6. Why This Feature Was Selected for MERN Prototype

### Selected Feature
**"Smart Regional Spice Discovery & Interactive Custom Box Combo Engine"** (Built inside the original **SwadYatra** MERN prototype).

### Problem Observed on Reference Website
1. Buyers cannot filter foods by authentic Maharashtrian culinary region (Vidarbha vs. Konkan vs. Kolhapur vs. Pune).
2. Spices lack heat level indicators (Mild vs. Extra Hot).
3. Customers wanting to buy gift boxes or combo packs must add items individually without combo discounts.

### Expected Benefits
- **User Benefit**: Effortlessly discover authentic regional food specialties, understand heat levels, and customize gift boxes with instant combo discounts.
- **Business Benefit**: Increases Average Order Value (AOV) by encouraging 4-item combo bundling and reduces bounce rates.
- **MERN Suitability**: Perfectly showcases React component architecture, state management, Express REST API routing, and MongoDB Mongoose database modeling.

---

## 7. Traffic & Customer Acquisition Growth Plan

### 7.1 Search Engine Optimization (SEO)
- **Long-Tail Regional Keywords**: Target search queries like *"authentic hand pounded Godaa masala Pune"* and *"buy Kolhapuri Lavangi chili online"*.
- **Structured JSON-LD Data**: Implement rich Google snippets for recipes (`Schema.org/Recipe`) and products.

### 7.2 Content & Retention Strategies
- **"Cook with Naik Foods" Blog**: Publish recipe guides pairing regional masalas with authentic dishes.
- **NRI Maharashtrian Diaspora Marketing**: Target Maharashtrian communities in Bengaluru, Mumbai, USA, UAE with festive gift boxes.
- **WhatsApp Quick Checkout**: Enable 1-click WhatsApp order inquiries for immediate support.

---

## 8. Original MERN Prototype Overview ("SwadYatra")

The accompanying working MERN prototype in `d:\5semester\naikfoods` demonstrates the complete solution:
- **Frontend**: React 19 + Vite + Tailwind CSS (`frontend/`).
- **Backend**: Node.js + Express.js + MongoDB (`backend/`).
- **Database Models**: `Product`, `Combo`, `Order` Mongoose schemas.
- **APIs**: Full REST endpoints for product discovery, combo calculation, and order processing.
- **Original Branding & UI**: Features original branding ("SwadYatra"), custom color palette, interactive regional map, spice heat meters, custom combo builder modal, recipe-to-cart engine, and live admin portal.
