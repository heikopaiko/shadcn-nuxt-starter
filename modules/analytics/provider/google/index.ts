import { useHead } from '#imports'

export function useAnalytics() {
  const analyticsInit = () => {
    if (!import.meta.client || !import.meta.env.VITE_GOOGLE_ANALYTICS_ID)
      return

    const googleAnalyticsId = import.meta.env.VITE_GOOGLE_ANALYTICS_ID

    useHead({
      script: [
        {
          key: 'analytics-google',
          src: `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`,
          async: true,
          onload: () => {
            if (typeof window === 'undefined')
              return;

            (window as any).dataLayer = (window as any).dataLayer || []

            function gtag() {
              // eslint-disable-next-line prefer-rest-params
              (window as any).dataLayer.push(arguments)
            }
            // @ts-expect-error - gtag is defined globally
            gtag('js', new Date())
            // @ts-expect-error - gtag is defined globally
            gtag('config', googleAnalyticsId)
          },
        },
      ],
    })
  }

  const trackEvent = (event: string, data?: Record<string, any>) => {
    if (typeof window === 'undefined' || !(window as any).gta)
      return;

    (window as any).gta('event', event, data)
  }

  return {
    analyticsInit,
    trackEvent,
  }
}
