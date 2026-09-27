/**
 * =============================================================================
 * HERO BANNER SHOWCASE CONFIGURATION
 * =============================================================================
 * 
 * Edit this file to customize the rotating showcase on the right side of the Hero banner.
 * 
 * ⚙️ HOW TO CONTROL THIS FEATURE:
 * 
 * 1. TURN ON / OFF:
 *    Set `enabled: true` to display the showcase.
 *    Set `enabled: false` to completely hide it and restore the original banner look.
 * 
 * 2. SELECT DISPLAY MODE:
 *    - `mode: 'mixed'`  -> Interchanges between images and text (e.g. Image -> Text -> Image)
 *    - `mode: 'images'` -> Only shows custom PNG images in loop
 *    - `mode: 'text'`   -> Only shows custom text messages in loop
 * 
 * 3. ORDER OF ITEMS:
 *    When `mode: 'mixed'`, you can arrange the `items` list below in any order you want!
 *    Each slide is strictly either:
 *      { type: 'image', src: '...', alt: '...' }
 *      OR
 *      { type: 'text', badge: '...', title: '...', subtitle: '...' }
 * =============================================================================
 */

export const heroShowcaseConfig = {
  // ⚡ FEATURE TOGGLE: Set to false to completely turn off this feature
  enabled: true,

  // 🎯 DISPLAY MODE: Choose 'mixed', 'images', or 'text'
  // 'mixed'  = Interchanges between images and text in loop (one image, then text, then image...)
  // 'images' = Shows only images in loop
  // 'text'   = Shows only text in loop
  mode: 'mixed', // 'mixed' | 'images' | 'text'

  // ⏱️ TIMING SETTINGS:
  // How long each item stays visible (in milliseconds, 4500 = 4.5 seconds)
  interval: 4500,

  // Smooth seamless cross-dissolve fade duration (in milliseconds, 1000 = 1 second)
  fadeDuration: 1000,

  // ===========================================================================
  // 📋 INTERCHANGEABLE ITEMS LIST (Used when mode: 'mixed')
  // Put them in whatever order you prefer (e.g., Image -> Text -> Image -> Text)
  // Images cover the full height of the banner as transparent PNG cutouts.
  // ===========================================================================
  items: [
    {
      type: 'image',
      id: 'item-1',
      src: '/showcase/diwali_diya.png',
      alt: 'Happy Diwali Celebrations',
    },
    {
      type: 'text',
      id: 'item-2',
      badge: '🪔 शुभ दीपावली',
      title: 'दीपों का पावन महापर्व',
      subtitle: 'भोजपुरी सुर के संग मनाएं रोशनी, उल्लास और भक्ति भरी पावन दिवाली।',
    },
    {
      type: 'image',
      id: 'item-3',
      src: '/showcase/chhath_sun.png',
      alt: 'Chhath Mahaparv Special',
    },
    {
      type: 'text',
      id: 'item-4',
      badge: '🙏 आस्था का महापर्व',
      title: 'जय छठी मइया',
      subtitle: 'शारदा सिन्हा और अनुराधा पौडवाल के सुप्रसिद्ध छठ गीतों के साथ पावन अर्घ्य।',
    },
    {
      type: 'image',
      id: 'item-5',
      src: '/showcase/bhojpuri_beats.png',
      alt: 'Non-Stop Bhojpuri Beats',
    },
    {
      type: 'text',
      id: 'item-6',
      badge: '🔥 ट्रेंडिंग बीट्स',
      title: 'धमाकेदार DJ पार्टी स्पेशल',
      subtitle: 'पवन सिंह, खेसारी लाल और शिल्पी राज के नॉन-स्टॉप ब्लॉकबस्टर गाने।',
    },
  ],

  // ===========================================================================
  // 🖼️ PURE IMAGES ONLY (Used when mode: 'images')
  // ===========================================================================
  images: [
    {
      id: 'img-1',
      src: '/showcase/diwali_diya.png',
      alt: 'Happy Diwali Celebrations',
    },
    {
      id: 'img-2',
      src: '/showcase/chhath_sun.png',
      alt: 'Chhath Mahaparv Special',
    },
    {
      id: 'img-3',
      src: '/showcase/bhojpuri_beats.png',
      alt: 'Non-Stop Bhojpuri Beats',
    },
  ],

  // ===========================================================================
  // ✍️ PURE TEXT ONLY (Used when mode: 'text')
  // ===========================================================================
  texts: [
    {
      id: 'txt-1',
      badge: '🪔 शुभ दीपावली',
      title: 'दीपों का पावन महापर्व',
      subtitle: 'भोजपुरी सुर के संग मनाएं रोशनी, उल्लास और भक्ति भरी पावन दिवाली।',
    },
    {
      id: 'txt-2',
      badge: '🙏 आस्था का महापर्व',
      title: 'जय छठी मइया',
      subtitle: 'शारदा सिन्हा और अनुराधा पौडवाल के सुप्रसिद्ध छठ गीतों के साथ पावन अर्घ्य।',
    },
    {
      id: 'txt-3',
      badge: '🔥 ट्रेंडिंग बीट्स',
      title: 'धमाकेदार DJ पार्टी स्पेशल',
      subtitle: 'पवन सिंह, खेसारी लाल और शिल्पी राज के नॉन-स्टॉप ब्लॉकबस्टर गाने।',
    },
  ],
};

export default heroShowcaseConfig;
