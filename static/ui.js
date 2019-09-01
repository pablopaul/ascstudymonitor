window.Menu = {
  getItemsForDisplay() {
    return Object.entries(Menu.items).map(([key, item]) => ({...item, key}))
  },

  renderOuter() {
    console.log("[Menu] render outer")

    if (!Menu.templateOuter) {
      Menu.templateOuter = Handlebars.compile(
        document.getElementById('template-menu-outer').innerHTML
      )
    }

    const $menu = $('#menu-content')
    const items = Menu.getItemsForDisplay()
    $menu.html(Menu.templateOuter({ items }))
  },

  renderItems(column) {
    console.log("[Menu] render inner", colum)

    if (!Menu.templateInner) {
      Menu.templateInner = Handlebars.compile(
        document.getElementById('template-menu-inner').innerHTML
      )
    }

    Menu.sortItems(column)

    const item = Menu.items[column]
    const $menu = $('#menu-content')
    $menu.html(Menu.templateInner({ item }))
  },

  filterItemClick(column, label, currentActive) {
    if (currentActive) {
      console.log("[Menu] deactivate", column, label)
      Menu.toggleActive(column, label, false)
      App.removeFilter(column, label)
    }
    else {
      console.log("[Menu] activate", column, label)
      Menu.toggleActive(column, label, true)
      App.addFilter(column, label)
    }
  },

  toggleActive(column, label, active) {
    Menu.items[column] = Menu.items[column].data.map(entry => {
      if (entry.label == label) {
        entry.active = active
      }
      return entry
    })

    Menu.render()
  },

  sortItems(colum) {
    Menu.items[column] = Menu.items[column].map(item => {
      return item.data.sort((a, b) => {
        if (a.active == b.active) {
          return b.count - a.count
        } else {
          return b.active ? 1 : -1
        }})
    })
  },

  toggleExpanded(column, expanded) {
    console.log("[Menu] expand", column, expanded)
    Menu.items[column].expanded = expanded
    Menu.render()
  },

  handleMenuCategoryToggle(key) {
    var isActive = Menu.items[key].expanded
    Menu.toggleExpanded(key, !isActive)
  },

  bootstrap(dataWithoutNormalizedAuthors) {
    var data = dataWithoutNormalizedAuthors.map(d => ({
      ...d,
      authors: d.authors
        ? d.authors.map(a => [a.last_name, a.first_name].join(', '))
        : null,
    }))

    const getDistinct = key =>
      Array.from(new Set(data.flatMap(d => d[key])))
        .filter(Boolean)
        .sort()

    var [allDisciplines, allSources, allAuthors, allYears] = [
      'disciplines',
      'source',
      'authors',
      'year',
    ].map(getDistinct)


    // console.log("items", items)
    //    Menu.render()
  },
}
