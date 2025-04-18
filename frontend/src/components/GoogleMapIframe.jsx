function GoogleMapIframe() {
    return (
      <div
        style={{
          width: '100%',
          height: '400px',
          border: '2px solid #ccc',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <iframe
          title="Ubicación"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3949.833810724279!2d-79.02267862936138!3d-8.118397663341295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91ad3d7abc435bd7%3A0x2a98865d0a5f1213!2sAv.%20Am%C3%A9rica%20Sur%2C%20Trujillo!5e0!3m2!1ses-419!2spe!4v1744490678257!5m2!1ses-419!2spe"
          width="100%"
          height="100%"
          style={{ border: '0' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    );
  }
  
  export default GoogleMapIframe;  