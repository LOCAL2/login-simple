# ระบบ Login/Register ด้วย Supabase

## การติดตั้ง

1. ติดตั้ง dependencies:
```bash
npm install
```

2. ตั้งค่า Supabase:
   - สร้างโปรเจกต์ใหม่ที่ [supabase.com](https://supabase.com)
   - สร้างตาราง `users` ด้วย SQL นี้:

```sql
CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);
```

3. แก้ไขไฟล์ `.env.local`:
   - เปลี่ยน `your_supabase_url_here` เป็น URL ของโปรเจกต์
   - เปลี่ยน `your_supabase_anon_key_here` เป็น anon key ของโปรเจกต์

4. รันโปรเจกต์:
```bash
npm run dev
```

## คุณสมบัติ

- ✅ สมัครสมาชิกด้วย username และ password
- ✅ เข้าสู่ระบบด้วย username และ password
- ✅ ตรวจสอบ username ซ้ำ
- ✅ แสดงข้อความผิดพลาดเมื่อ login ผิด
- ✅ หน้า Dashboard แสดงชื่อผู้ใช้
- ✅ ออกจากระบบ
- ✅ UI แบบ Light Theme มืออาชีพ
