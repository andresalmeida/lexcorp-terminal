# 🌐 Guía de Configuración de Subdominios en Vercel

Esta guía te ayudará a configurar subdominios para tus proyectos en Vercel, permitiéndote tener múltiples aplicaciones bajo tu dominio principal.

---

## 📋 **Estructura Recomendada**

```
adaghost.me                → Portfolio principal (lexcorp-terminal)
chat.adaghost.me           → Chat IA con personajes
dashboard.adaghost.me      → Futuros proyectos
nombre-proyecto.adaghost.me → Otros proyectos
```

---

## 🚀 **Configuración Paso a Paso**

### **1. Preparar el Proyecto**

Cada proyecto debe estar en su propio repositorio de GitHub:

```bash
# Ejemplo: Crear repo para el chat
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/tu-usuario/superhero-ai-chat.git
git push -u origin main
```

---

### **2. Deploy en Vercel**

1. Ve a [vercel.com](https://vercel.com) e inicia sesión
2. Click en **"Add New Project"**
3. Importa tu repositorio de GitHub
4. Configura las variables de entorno si las necesitas (ej: `GEMINI_API_KEY`)
5. Click en **"Deploy"**

---

### **3. Agregar Subdominio Personalizado**

Una vez deployado el proyecto:

1. Entra a **Project Settings** → **Domains**
2. Click en **"Add Domain"**
3. Escribe tu subdominio: `chat.adaghost.me`
4. Vercel te dará instrucciones DNS

---

### **4. Configurar DNS en tu Proveedor de Dominio**

#### **Opción A: Si Vercel maneja tu dominio principal**

Vercel lo configurará automáticamente ✅

#### **Opción B: Si usas otro proveedor (GoDaddy, Namecheap, etc.)**

Agregar un registro CNAME:

```
Tipo:    CNAME
Nombre:  chat
Valor:   cname.vercel-dns.com
TTL:     3600 (o automático)
```

**Ejemplo visual:**
```
┌──────────┬──────────────┬────────────────────────┐
│   Tipo   │    Nombre    │         Valor          │
├──────────┼──────────────┼────────────────────────┤
│  CNAME   │     chat     │  cname.vercel-dns.com  │
│  CNAME   │   dashboard  │  cname.vercel-dns.com  │
│  CNAME   │   proyecto1  │  cname.vercel-dns.com  │
└──────────┴──────────────┴────────────────────────┘
```

---

### **5. Esperar Propagación DNS**

- Tiempo típico: 5-15 minutos
- Máximo: 48 horas
- Verifica en: https://dnschecker.org

---

## ✅ **Verificación**

Una vez configurado, deberías ver:

```
✅ chat.adaghost.me → ✓ Valid Configuration
   SSL Certificate: Active
```

---

## 🔒 **SSL (HTTPS) Automático**

Vercel provee certificados SSL automáticos y gratuitos para todos los dominios.

**No necesitas hacer nada adicional** - Vercel lo maneja automáticamente.

---

## 📦 **Template para Nuevos Proyectos**

Para cada nuevo proyecto:

1. **Crear repositorio** en GitHub
2. **Deploy** en Vercel
3. **Agregar subdominio** en Vercel
4. **Configurar CNAME** en DNS
5. **Esperar** propagación
6. **Agregar link** en tu portfolio principal

---

## 🎯 **Ejemplo: Proyecto Chat**

### **Repositorio GitHub**
```
https://github.com/tu-usuario/superhero-ai-chat
```

### **Deploy Vercel**
```
https://superhero-ai-chat.vercel.app (URL temporal)
```

### **Subdominio Final**
```
https://chat.adaghost.me (URL personalizada)
```

### **Link desde Portfolio**
```html
<!-- En index.astro, sección Projects -->
<a href="https://chat.adaghost.me" target="_blank">
  Ver Demo del Chat IA →
</a>
```

---

## 🔧 **Variables de Entorno**

Para proyectos que requieren API keys (como el chat):

1. En Vercel: **Project Settings** → **Environment Variables**
2. Agregar:
   ```
   Key:   GEMINI_API_KEY
   Value: tu-api-key-aqui
   ```
3. **Redeploy** el proyecto

---

## 📱 **Múltiples Proyectos**

Puedes tener **ILIMITADOS** subdominios en el plan gratuito de Vercel:

```
adaghost.me              → Portfolio
chat.adaghost.me         → Chat IA
dashboard.adaghost.me    → Dashboard Analytics  
kasaychi.adaghost.me     → Proyecto Kasaychi
clima.adaghost.me        → App del Clima
```

---

## ❓ **Troubleshooting**

### **El subdominio no funciona**
- ✅ Verifica que el CNAME esté correcto
- ✅ Espera propagación DNS (hasta 48h)
- ✅ Verifica en dnschecker.org

### **Error de SSL**
- ✅ Espera unos minutos, Vercel lo genera automáticamente
- ✅ Fuerza regeneración en Vercel settings

### **404 en el subdominio**
- ✅ Verifica que el proyecto esté deployado
- ✅ Revisa logs en Vercel dashboard

---

## 📚 **Recursos**

- [Vercel Domains Docs](https://vercel.com/docs/concepts/projects/domains)
- [DNS Checker](https://dnschecker.org)
- [SSL Labs Test](https://www.ssllabs.com/ssltest/)

---

## 🎉 **¡Listo!**

Con esta configuración puedes:
- ✅ Mantener tu portfolio principal limpio y enfocado
- ✅ Tener proyectos separados con sus propios repos
- ✅ Usar subdominios profesionales
- ✅ Deploy automático con git push
- ✅ SSL gratis para todo

---

**¿Preguntas?** Revisa la [documentación oficial de Vercel](https://vercel.com/docs).

