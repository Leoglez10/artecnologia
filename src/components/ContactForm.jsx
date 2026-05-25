import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const contactInfo = [
  {
    icon: "location_on",
    title: "Ubicación",
    details: "Juan Dominguez 547 B, Col. Constitución, Zapopan, Jalisco, Mx",
  },
  {
    icon: "mail",
    title: "E-mail",
    details:
      "falvarado@www.artecnologia.com.mx / administracion@www.artecnologia.com.mx",
  },
  {
    icon: "phone",
    title: "Teléfonos",
    details: "01 (33) 2400 0565 / Cel: (+52) 33 1433 3102 / (+52) 33 3189 0431",
  },
  {
    icon: "schedule",
    title: "Horario",
    details: "Lunes a Viernes 10:00 am a 7:00 pm / Sábados 10:00 am a 2:00 pm",
  },
];

export default function ContactForm() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const animateOnScroll = (targets, fromVars, triggerEl) => {
        const elements = container.querySelectorAll(targets);
        if (!elements.length) return;

        gsap.set(elements, { willChange: "transform, opacity" });

        gsap.fromTo(
          elements,
          { ...fromVars, immediateRender: false },
          {
            y: 0,
            x: 0,
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: fromVars.duration || 0.8,
            stagger: fromVars.stagger || 0,
            ease: fromVars.ease || "power3.out",
            scrollTrigger: {
              trigger: container.querySelector(triggerEl) || elements[0],
              start: "top 92%",
              toggleActions: "play none none none",
            },
            onComplete: () => gsap.set(elements, { clearProps: "willChange" }),
          },
        );
      };

      // 1. Contact info side slide/fade in
      animateOnScroll(
        ".contact-info-animate",
        { x: -40, opacity: 0, stagger: 0.15, ease: "power3.out" },
        ".contact-info-animate",
      );

      // 2. Form panel slide in from right
      animateOnScroll(
        ".contact-form-animate",
        { x: 40, opacity: 0, scale: 0.98, duration: 0.9, ease: "power2.out" },
        ".contact-form-animate",
      );
    },
    { scope: containerRef },
  );

  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    asunto: "",
    mensaje: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const successDialogRef = useRef(null);

  useEffect(() => {
    const dialog = successDialogRef.current;
    if (!showSuccessModal || !dialog || dialog.open) return;

    dialog.showModal();
  }, [showSuccessModal]);

  const closeSuccessDialog = () => setShowSuccessModal(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido";
    }

    if (!formData.correo.trim()) {
      newErrors.correo = "El correo electrónico es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.correo)) {
      newErrors.correo = "El formato de correo no es válido";
    }

    if (!formData.mensaje.trim()) {
      newErrors.mensaje = "El mensaje es requerido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((current) => ({ ...current, [name]: value }));
    // Clear specific error as user types
    if (errors[name]) {
      setErrors((current) => ({ ...current, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/send_mail.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setShowSuccessModal(true);
        setFormData({
          nombre: "",
          correo: "",
          telefono: "",
          asunto: "",
          mensaje: "",
        });
      } else {
        alert(
          "Ocurrió un error al enviar el mensaje. Por favor intenta de nuevo.",
        );
      }
    } catch (error) {
      alert("No se pudo conectar con el servidor. Verifica tu conexión.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={containerRef}
      id="contacto"
      aria-labelledby="contacto-title"
      className="py-28 bg-white dark:bg-slate-900 transition-colors duration-300 overflow-hidden"
    >
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info Column */}
          <div className="contact-info-animate">
            <h2
              id="contacto-title"
              className="font-headline-lg text-headline-lg text-on-surface dark:text-white mb-6 tracking-tight font-bold"
            >
              CONTÁCTANOS
            </h2>
            <p className="font-body-lg text-body-lg text-text-muted dark:text-slate-300 mb-10 leading-relaxed">
              Somos una agencia joven con gran experiencia dispuesta a llevar
              tus ideas al entorno digital. Escríbenos o llámanos para programar
              una asesoría sin costo.
            </p>

            <div className="space-y-8">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-fixed dark:bg-slate-800 rounded-xl flex items-center justify-center shrink-0 shadow-xs border border-outline-variant/10 dark:border-slate-700/50">
                    <span
                      className="material-symbols-outlined text-primary dark:text-secondary-container select-none"
                      aria-hidden="true"
                    >
                      {info.icon}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-label-md text-sm font-bold text-on-surface dark:text-white mb-1">
                      {info.title}
                    </h4>
                    <p className="text-text-muted dark:text-slate-300 text-sm leading-relaxed max-w-md">
                      {info.details}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="contact-form-animate bg-slate-50 dark:bg-slate-800/40 p-8 rounded-3xl border border-outline-variant/10 dark:border-slate-700/50 shadow-[0px_10px_30px_rgba(0,0,0,0.02)]">
            <h3 className="font-headline-md text-xl font-bold text-on-surface dark:text-white mb-6">
              Envíanos un mensaje
            </h3>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
              aria-describedby="contact-form-help"
            >
              <p id="contact-form-help" className="sr-only">
                Los campos nombre, correo electrónico y mensaje son
                obligatorios.
              </p>
              {/* Name */}
              <div>
                <label
                  htmlFor="nombre"
                  className="block font-bold text-xs text-on-surface-variant dark:text-slate-300 mb-1.5"
                >
                  Nombre (requerido)
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  autoComplete="name"
                  required
                  minLength="2"
                  value={formData.nombre}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.nombre)}
                  aria-describedby="nombre-hint nombre-error"
                  aria-errormessage="nombre-error"
                  className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-1 transition-all bg-white dark:bg-slate-900 text-on-surface dark:text-white ${
                    errors.nombre
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-outline-variant/30 focus:border-primary dark:focus:border-secondary-container focus:ring-primary"
                  }`}
                  placeholder="Tu nombre completo"
                />
                <span
                  id="nombre-hint"
                  className="block text-[10px] text-text-muted dark:text-slate-400 mt-1"
                >
                  Mínimo 2 caracteres.
                </span>
                {errors.nombre && (
                  <span
                    id="nombre-error"
                    role="alert"
                    className="text-[10px] font-bold text-red-500 mt-1 block"
                  >
                    {errors.nombre}
                  </span>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="correo"
                  className="block font-bold text-xs text-on-surface-variant dark:text-slate-300 mb-1.5"
                >
                  Correo Electrónico (requerido)
                </label>
                <input
                  type="email"
                  id="correo"
                  name="correo"
                  autoComplete="email"
                  inputMode="email"
                  required
                  value={formData.correo}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.correo)}
                  aria-describedby="correo-hint correo-error"
                  aria-errormessage="correo-error"
                  className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-1 transition-all bg-white dark:bg-slate-900 text-on-surface dark:text-white ${
                    errors.correo
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-outline-variant/30 focus:border-primary dark:focus:border-secondary-container focus:ring-primary"
                  }`}
                  placeholder="ejemplo@correo.com"
                />
                <span
                  id="correo-hint"
                  className="block text-[10px] text-text-muted dark:text-slate-400 mt-1"
                >
                  Formato: nombre@dominio.com
                </span>
                {errors.correo && (
                  <span
                    id="correo-error"
                    role="alert"
                    className="text-[10px] font-bold text-red-500 mt-1 block"
                  >
                    {errors.correo}
                  </span>
                )}
              </div>

              {/* Phone & Subject */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="telefono"
                    className="block font-bold text-xs text-on-surface-variant dark:text-slate-300 mb-1.5"
                  >
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    autoComplete="tel"
                    inputMode="tel"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="w-full border border-outline-variant/30 rounded-xl px-4 py-3 focus:outline-none focus:border-primary dark:focus:border-secondary-container focus:ring-1 focus:ring-primary bg-white dark:bg-slate-900 text-on-surface dark:text-white transition-all"
                    placeholder="10 dígitos"
                  />
                </div>
                <div>
                  <label
                    htmlFor="asunto"
                    className="block font-bold text-xs text-on-surface-variant dark:text-slate-300 mb-1.5"
                  >
                    Asunto
                  </label>
                  <input
                    type="text"
                    id="asunto"
                    name="asunto"
                    value={formData.asunto}
                    onChange={handleChange}
                    className="w-full border border-outline-variant/30 rounded-xl px-4 py-3 focus:outline-none focus:border-primary dark:focus:border-secondary-container focus:ring-1 focus:ring-primary bg-white dark:bg-slate-900 text-on-surface dark:text-white transition-all"
                    placeholder="¿En qué te ayudamos?"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="mensaje"
                  className="block font-bold text-xs text-on-surface-variant dark:text-slate-300 mb-1.5"
                >
                  Mensaje (requerido)
                </label>
                <textarea
                  name="mensaje"
                  id="mensaje"
                  rows="4"
                  required
                  minLength="10"
                  value={formData.mensaje}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.mensaje)}
                  aria-describedby="mensaje-hint mensaje-error"
                  aria-errormessage="mensaje-error"
                  className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-1 transition-all bg-white dark:bg-slate-900 text-on-surface dark:text-white resize-none ${
                    errors.mensaje
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-outline-variant/30 focus:border-primary dark:focus:border-secondary-container focus:ring-primary"
                  }`}
                  placeholder="Cuéntanos más sobre tu idea o proyecto..."
                />
                <span
                  id="mensaje-hint"
                  className="block text-[10px] text-text-muted dark:text-slate-400 mt-1"
                >
                  Incluye al menos 10 caracteres para entender mejor tu
                  proyecto.
                </span>
                {errors.mensaje && (
                  <span
                    id="mensaje-error"
                    role="alert"
                    className="text-[10px] font-bold text-red-500 mt-1 block"
                  >
                    {errors.mensaje}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary-container dark:bg-secondary-container dark:text-slate-900 text-on-primary font-bold py-4 rounded-xl transition-all duration-300 shadow-md flex items-center justify-center gap-2 mt-4 hover:scale-102 disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white dark:text-slate-900"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Enviando...</span>
                  </>
                ) : (
                  <span>Enviar Mensaje</span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Success Modal (Glassmorphism) */}
      {showSuccessModal && (
        <dialog
          ref={successDialogRef}
          className="modal-dialog p-0 bg-transparent backdrop:bg-black/60"
          aria-labelledby="success-title"
          aria-describedby="success-message"
          onCancel={closeSuccessDialog}
          onClose={closeSuccessDialog}
          onClick={(event) => {
            if (event.target === event.currentTarget) closeSuccessDialog();
          }}
        >
          <div className="relative glass-card text-on-surface dark:text-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl z-50 animate-fade-in-up">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <span
                className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-4xl select-none font-bold"
                aria-hidden="true"
              >
                done
              </span>
            </div>

            <h3
              id="success-title"
              className="font-bold text-2xl tracking-tight mb-2"
            >
              ¡Mensaje Enviado!
            </h3>
            <p
              id="success-message"
              className="text-sm text-text-muted dark:text-slate-300 leading-relaxed mb-6"
            >
              Agradecemos tu interés. Uno de nuestros asesores se pondrá en
              contacto contigo a la brevedad posible.
            </p>

            <button
              onClick={closeSuccessDialog}
              className="bg-primary dark:bg-secondary-container dark:text-slate-900 text-on-primary font-bold px-6 py-2.5 rounded-xl hover:scale-105 transition-all duration-200 w-full shadow-md"
            >
              Entendido
            </button>
          </div>
        </dialog>
      )}
    </section>
  );
}
