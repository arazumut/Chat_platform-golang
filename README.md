  <a href="https://golang.org/" target="_blank" rel="noreferrer"> 
        <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/go/go-original.svg" alt="golang" width="40" height="40"/> 
    </a>
    <br>
Go ile Gerçek Zamanlı Mesajlaşma Uygulaması
Giriş
Bu makale, Go programlama dili kullanılarak geliştirilmiş basit bir WebSocket sunucusunun işleyişini ve bileşenlerini açıklamaktadır. Bu WebSocket sunucusu, kullanıcıların gerçek zamanlı olarak mesaj gönderip alabilmelerini sağlar. Program, HTTP bağlantılarını WebSocket bağlantılarına yükseltir ve kullanıcılar arasında mesajları yayınlar.


Genel Yapı
HTTP Sunucusu: Statik dosyaları sunar ve WebSocket bağlantılarını kabul eder.
WebSocket Bağlantıları: Kullanıcıların gerçek zamanlı mesajlar göndermesini ve almasını sağlar.
Mesaj Yayını (Broadcasting): Gönderilen mesajlar, tüm bağlı kullanıcılara iletilir.
Detaylı Açıklama


HTTP Sunucusunun Kurulumu


Program, bir HTTP sunucusu başlatır ve belirli bir port üzerinde dinler.Statik dosyalar için bir dosya sunucusu yapılandırılır ve kök URL (/) üzerinden sunulur. WebSocket bağlantıları ise /ws endpoint'i üzerinden kabul edilir.

WebSocket Yükseltici
websocket.Upgrader yapısı, HTTP bağlantılarını WebSocket bağlantılarına yükseltmek için kullanılır. Bu yapı, belirli bir HTTP isteğini alır ve WebSocket protokolüne geçiş yapar. CheckOrigin fonksiyonu, herhangi bir kaynaktan gelen bağlantıların kabul edilmesini sağlar.

Bağlı Kullanıcılar ve Mesaj Yayını
Program, bağlı kullanıcıları takip etmek için bir harita (clients) ve gönderilen mesajları işlemek için bir kanal (broadcast) kullanır. Harita, aktif WebSocket bağlantılarını tutar ve kanal, gönderilen mesajları depolar.

WebSocket Bağlantılarının Yönetimi
handleConnections fonksiyonu, yeni bir WebSocket bağlantısı oluşturur ve gelen mesajları dinler. Bir bağlantı kurulduğunda, bu bağlantı clients haritasına eklenir. Bağlantı kesildiğinde ise haritadan kaldırılır.

Mesajların Yayınlanması
handleMessages fonksiyonu, broadcast kanalından gelen mesajları dinler ve bu mesajları clients haritasındaki tüm bağlı kullanıcılara iletir. Bir kullanıcı mesaj gönderdiğinde, bu mesaj diğer tüm kullanıcılara yayınlanır. Mesaj gönderimi sırasında bir hata oluşursa, ilgili bağlantı kapatılır ve haritadan kaldırılır.


Bu Go WebSocket sunucusu, kullanıcıların gerçek zamanlı olarak mesaj gönderip alabilmelerini sağlayan basit bir uygulamadır. Program, HTTP bağlantılarını WebSocket bağlantılarına yükseltir, kullanıcıların bağlantılarını yönetir ve mesajları tüm bağlı kullanıcılara yayınlar. Bu tür bir yapı, gerçek zamanlı iletişim gerektiren sohbet uygulamaları, canlı bildirim sistemleri ve benzeri uygulamalar için temel bir altyapı sağlar.

![Ekran görüntüsü 2024-07-22 110802](https://github.com/user-attachments/assets/ead9c75f-e655-4e9c-9e24-be906a4457bd)

![Ekran görüntüsü 2024-07-22 112335](https://github.com/user-attachments/assets/d307c0ac-0960-432f-a8f1-b91634f261ff)









