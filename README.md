# Medical Claim Review Dashboard

Frontend assignment for SuperClaims.

## Live Demo

https://superclaims-frontend-assignment.vercel.app/

## Overview

A split-screen dashboard to review medical claims:

- **Left:** PDF document  
- **Right:** Extracted JSON data  

## Tech Stack

- React  
- TypeScript  
- Vite  
- Tailwind CSS  
- react-pdf  

## Features

- Claim Summary (ID, type, status, claimed vs bills total, discrepancy)
- Patient Info
- Bills with item table (NME items highlighted in red)
- Audit Issues (counts + details)
- Document Segments (clickable page numbers)

## Setup

```bash
git clone https://github.com/anasnadkar45/frontend-assignment-feb-20.git
cd frontend-assignment-feb-20
npm install
npm run dev
