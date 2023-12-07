如果一个页面中引入了多个组件，不同的组件中有相同的样式，如:
    School.vue组件中:
        <style>
            .div {
                background-color: orange;
            }
        </style>
    Student.vue组件中:
        <style>
            .div {
                background-color: orange;
            }
        </style>
会出现一个问题，这两个组件如果在App.vu同时被引入了，则 .div 这个样式会冲突后引入的组件中
的 .div 样式会覆盖先引入的组件中的 .div 样式，为了解决这个问题，可以给<style>上添加scoped配置
    School.vue组件中:
        <style scoped>
            .div {
                background-color: orange;
            }
        </style>
    Student.vue组件中:
        <style scoped>
            .div {
                background-color: orange;
            }
        </style>
这样就不会有样式冲突问题了