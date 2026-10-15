# Silent Shoe Director v0.1.5

เว็บช่วยสร้าง Prompt สำหรับคลิปรีวิวรองเท้าแบบเงียบ (silent tabletop review) ที่เน้นมือจับสินค้า ฉากโต๊ะรีวิว และความแม่นยำของสินค้าเป็นหลัก

## จุดเด่นในเวอร์ชัน 0.1.2

- ภาพจริงของ **สินค้า / ฉาก / มือ** มีสิทธิ์เหนือ preset อย่างชัดเจน
- AI วิเคราะห์ภาพแบบ **Targeted Role Analysis**
  - `overall` สนใจเฉพาะตัวรองเท้าโดยรวม
  - `side` สนใจเฉพาะโปรไฟล์ด้านข้าง
  - `detail` สนใจเฉพาะดีเทลระยะใกล้
  - `sole` สนใจเฉพาะพื้นรองเท้า
  - `scene` สนใจเฉพาะฉากโต๊ะและแสง
  - `hand` สนใจเฉพาะมือ เล็บ แขนเสื้อ และเครื่องประดับ
  - `endFrame` สนใจเฉพาะ continuity state เพื่อส่งต่อไปคลิปถัดไป
- Prompt ระบุชื่อไฟล์ภาพและบทบาทของภาพอย่างชัดเจน
- Export / Import โปรเจกต์พร้อมภาพอ้างอิงแบบฝังใน JSON
- รองรับ 1 หรือ 2 คลิป (เลือก 8 หรือ 10 วินาทีต่อคลิป)

## วิธีใช้ย่อ

1. `npm install`
2. ตั้งค่า `.env` (ถ้าจะใช้ Gemini)
3. `npm run dev`
4. เปิด `http://127.0.0.1:3035`
5. อัปโหลดภาพรองเท้า ฉาก และภาพมือ
6. กด `AI วิเคราะห์รูป` ตาม role ที่ต้องการ
7. กด `สร้าง Silent Shoe Prompts` หรือ `ให้ Gemini ช่วยกำกับช็อต`
8. Export Flow Pack หรือ Export Project ได้

## หมายเหตุ

- ถ้าไม่มี `GEMINI_API_KEY` ระบบยังสร้าง Prompt แบบ deterministic ได้
- ถ้ามีภาพมือจริงและภาพฉากจริง ระบบจะถือว่ารูปจริงเป็น authoritative source
- preset ใน `Table Scene` และ `Hand Model Styling` ใช้เป็น fallback เมื่อยังไม่มีภาพจริง


## เพิ่มใน v0.1.3

- แก้ปัญหาอัปโหลด end frame แล้วไม่เห็นผล โดยเพิ่ม preview, file status, replace/remove และปุ่ม refresh SH_02
- Continuity ใช้งานได้ทันทีหลังอัปโหลด end frame แม้ไม่กด AI วิเคราะห์
- ถ้ากด AI วิเคราะห์ end frame ระบบจะส่งบริบทของ SH_01 และร่าง SH_02 ไปช่วยให้ Gemini วิเคราะห์ continuity ได้แม่นขึ้น


## เพิ่มใน v0.1.4
- เลือกจำนวนมือ 1 มือ / 2 มือ และให้ logic นี้ส่งผลต่อ prompt จริง
- เพิ่ม Product Demo Actions แบบเลือกหลายรายการ เช่น กดให้ดูนุ่ม แตะดีเทล วางแล้วหยิบขึ้น และชนรองเท้าเบา ๆ
- เพิ่ม guard rail ตามประเภทรองเท้า เพื่อกัน prompt ที่บิด งอ หรือชนสินค้าดูเกินจริง


## เพิ่มใน v0.1.5 — เลือก 8 หรือ 10 วินาทีต่อช็อต
- `Shot Direction → ความยาวต่อคลิป`: 8s (default) หรือ 10s ทั้ง SH_01 / SH_02
- 8s ใช้สามจังหวะเดิม; 10s ใช้ 4 จังหวะ 0–2, 2–5, 5–8, 8–10 วินาที
- Gemini AI Director และ Prompt Compiler รับค่าเวลาจริง; Image Reference Guide, End Frame, การคุมสินค้า/มือและโหมดเงียบยังคงเหมือนเดิม
- Flow Pack export มี `clipDurationSeconds` และ shot `seconds` ที่ตรงกับค่าเลือก
- โปรเจกต์ JSON เก่าที่ไม่มี `studio.clipDuration` ยังโหลดเป็น 8s ได้ด้วย schemaVersion=1 (ไม่บังคับ migrate)
- Google Flow: โหมด **Gemini Omni Flash 1.1** รองรับ 10s รวมการใช้ภาพอ้างอิง; **Veo 3.1** รองรับสูงสุด 8s ตาม Google Flow Help ปัจจุบัน (ตรวจตัวเลือกใน UI ก่อนใช้เครดิต) https://support.google.com/flow/answer/16352836
