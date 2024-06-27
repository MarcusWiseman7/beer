<script>
    /**
     * @type {string | any[]}
     */
    export let data = [];
</script>

{#if data?.length}
    <div class="table-wrapper">
        <table>
            <thead>
                <tr>
                    {#each Object.keys(data[0]) as key}
                        <th>{key}</th>
                    {/each}
                </tr>
            </thead>
            <tbody>
                {#each data as row}
                    <tr>
                        {#each Object.values(row) as value}
                            <td>{value}</td>
                        {/each}
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
{/if}

<style lang="scss">
    // Define basic variables for colors and spacing
    $primary-color: var(--main-admin);
    $font-color: #2c3e50;
    $border-color: #bdc3c7;
    $border-radius: 4px;

    .table-wrapper {
        margin: 20px auto;
        background-color: var(--page);
        border-radius: $border-radius;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        overflow: auto auto;

        table {
            border-collapse: collapse;
            width: 100%;
            overflow: hidden;
            border-radius: $border-radius;

            thead {
                background-color: $primary-color;
                color: var(--page);

                th {
                    text-align: left;
                    font-weight: bold;
                    border-right: 1px solid var(--border);
                    padding: 8px 12px;

                    &:last-child {
                        border-right: none;
                    }
                }
            }

            tbody {
                tr {
                    &:hover {
                        background-color: var(--hover);
                    }

                    td {
                        padding: 8px 12px;
                        border-right: 1px solid $border-color;
                        color: $font-color;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        max-width: 100px;

                        &:last-child {
                            border-right: none;
                        }
                    }
                }
            }
        }
    }
</style>
