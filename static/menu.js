function initMenu() {
  new Vue({
    el: '#menu-content',
    data: {
      distinct: App.distinct,
      keys: App,
      open: App.Menu.open,
      items: {
        disciplines: {
          expanded: false,
          title: 'Disciplines',
          total: App.distinct.disciplines.length,
          data: App.distinct.disciplines.map(discipline => ({
            active: false,
            label: discipline,
            count: App.data.filter(
              d => d.disciplines && d.disciplines.includes(discipline)
            ).length,
          })),
        },
        source: {
          expanded: false,
          title: 'Journals',
          total: App.distinct.source.length,
          data: App.distinct.source.map(source => ({
            active: false,
            label: source,
            count: App.data.filter(d => d.source === source).length,
          })),
        },
        authors: {
          expanded: false,
          title: 'Authors',
          total: App.distinct.authors.length,
          data: App.distinct.authors.map(author => ({
            active: false,
            label: author,
            count: App.data.filter(d => d.authors && d.authors.includes(author))
              .length,
          })),
        },
        year: {
          expanded: false,
          title: 'Years',
          total: App.distinct.year.length,
          data: App.distinct.year.map(year => ({
            active: false,
            label: year,
            count: App.data.filter(d => d.year === year).length,
          })),
        },
      },
      data: App.data,
    },
    methods: {
      handleMenuCategoryToggle(event) {
        console.log('menu category toggle')
        const $target = $(event.target)

        const key = $target.closest('li').data('key')
        toggle(App.Menu.open, key)
        $(`ul[data-key="${key}"]`)
          .stop()
          .slideToggle(300)
      },
      filterItemClick() {
        const $target = $(event.target)

        const key = $target.closest('ul').data('key')
        const value = $target.data('value')
        console.log('call toggle filer', key, value)
        App.toggleFilter(key, value)
      },
    },
  })

  // var data = dataWithoutNormalizedAuthors.map(d => ({
  //       ...d,
  //       authors: d.authors
  //         ? d.authors.map(a => [a.last_name, a.first_name].join(', '))
  //         : null,
  //     }))
}

function toggle(collection, item) {
  var idx = collection.indexOf(item)
  if (idx !== -1) {
    collection.splice(idx, 1)
  } else {
    collection.push(item)
  }
}
