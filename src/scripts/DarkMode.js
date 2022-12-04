      let darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

      updateMode()
      darkModeMediaQuery.addEventListener('change', updateModeWithoutTransitions)
      window.addEventListener('storage', updateModeWithoutTransitions)

      function updateMode() {
        let isSystemDarkMode = darkModeMediaQuery.matches
        let isDarkMode = window.localStorage.isDarkMode === 'true' || (!('isDarkMode' in window.localStorage) && isSystemDarkMode)

        if (isDarkMode) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }

        if (isDarkMode === isSystemDarkMode) {
          delete window.localStorage.isDarkMode
        }
      }

      function disableTransitionsTemporarily() {
        document.documentElement.classList.add('[&_*]:!transition-none')
        window.setTimeout(() => {
          document.documentElement.classList.remove('[&_*]:!transition-none')
        }, 0)
      }

      function updateModeWithoutTransitions() {
        disableTransitionsTemporarily()
        updateMode()
      }


      // function disableTransitionsTemporarily() {
      //   document.documentElement.classList.add('[&_*]:!transition-none')
      //   window.setTimeout(() => {
      //     document.documentElement.classList.remove('[&_*]:!transition-none')
      //   }, 0)
      // }

      function toggleMode() {
        disableTransitionsTemporarily()

        let darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        let isSystemDarkMode = darkModeMediaQuery.matches
        let isDarkMode = document.documentElement.classList.toggle('dark')

        if (isDarkMode === isSystemDarkMode) {
          delete window.localStorage.isDarkMode
        } else {
          window.localStorage.isDarkMode = isDarkMode
        }
      }

// darkModeButton defined in src/components/Header.astro
document.getElementById('darkModeButton').addEventListener('click', () => {
  toggleMode();
});