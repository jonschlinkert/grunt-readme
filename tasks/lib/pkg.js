/**
 * package.json placeholder. this is used as a fallback
 * when no package.json is present in a project.
 *
 * Why? This is easier, requires less logic, and won't slow down
 * the build as much as adding conditional logic to all the mixins
 * and anywhere else in the project that leverages package.json.
 * With this approach we just update the properties here when
 * necessary.
 *
 * Also, if you're not using a package.json but you still want
 * to supply metadata to your templates, you can use YAML front
 * matter in the templates, or add a metadata object to the
 * readme task options with the properties you require.
 */

module.exports = {
  name: '',
  description: '',
  version: '',
  homepage: '',
  author: {
    name: '',
    url: ''
  },
  contributors: [
    {
      name: '',
      url: ''
    }
  ],
  licenses: [
    {
      type: '',
      url: ''
    }
  ],
  repository: {
    type: '',
    url: ''
  },
  bugs: {
    url: ''
  },
  main: '',
  dependencies: {},
  devDependencies: {},
  keywords: []
}
