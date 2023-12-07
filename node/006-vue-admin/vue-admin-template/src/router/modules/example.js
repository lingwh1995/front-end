import Layout from '@/layout'

const componentsRouter = {
  path: '/example',
  component: Layout,
  redirect: '/example/table',
  name: 'Example',
  meta: { title: 'Example', icon: 'example' },
  children: [
    {
      path: 'table',
      name: 'Table',
      component: () => import('@/views/table/index'),
      meta: { title: 'Table', icon: 'table' }
    },
    {
      path: 'tree',
      name: 'Tree',
      component: () => import('@/views/tree/index'),
      meta: { title: 'Tree', icon: 'tree' }
    }
  ]
}

export default componentsRouter
