//page.tsx

import { highlight } from "../lib/highlighter";
import CodeBlock from "./components/CodeBlock";

export default async function Home() {
  const blocks = [
    { title: "Script 1", code: `print("hello script1")` },
    { title: "Script 2", code: `print("import os

# reads data from a file and stores it in an array
def read_delivery_file(filename):
    records = []
    with open(filename, 'r') as f:
        for line in f:
            row = line.strip().split(',')
            records.append(row)
    return records

def find_missing_deliveries():
    # creates an array with missing deliveries
    missing_deliveries = []
    for delivery in delivery_codes:
        #  check whether the delivery code appears in delivery_data (if it does not, add it)
        if delivery[0] not in delivery_data:
            missing_deliveries.append(delivery[0])

    missing_deliveries_file = f'Missing_Deliveries_{target_date}.csv'

    # writes the missing deliveries to csv
    with open(missing_deliveries_file, 'w') as f:
        for code in missing_deliveries:
            f.write(str(code) + ',\n')
        print("File:", missing_deliveries_file, " created")

def process_all_deliveries():
    total_value = 0
    total_packages = 0

    # iterate over all files in the deliveries directory
    for filename in os.listdir(deliveries_dir):
        fpath = os.path.join(deliveries_dir, filename) # gets the full path for that file
        # checks whether fpath is a file
        if os.path.isfile(fpath):
            # Filename format: DELIVERYCODE_DATE_MAXITEMS.csv
            parts = filename.replace('.csv', '').split('_')
            delivery_code = parts[0]
            # extract the delivery_date and max_items from parts
            delivery_date = parts[1]
            max_items = int(parts[2])

            # check whether delivery date matches target_date
            if delivery_date == target_date:
                file_records = read_delivery_file(fpath)

                delivery_value = 0
                delivered_count = 0
                values = []
                for record in file_records:
                    package_value = float(record[1]) # value is in column 1
                    # calculate total value for this delivery
                    delivery_value += package_value
                    # count number of packages delivered (each line is 1 package)
                    delivered_count += 1
                    values.append(package_value)

                # calculate average package value for this delivery
                import statistics
                if delivered_count > 0:
                    avg_value = statistics.mean(values)
                else:
                    avg_value = 0

                # store in delivery_data the delivery_code + value data
                delivery_data[delivery_code] = delivery_value
                # print delivery_code, delivered/max, total value, average value
                print(f"Delivery: {delivery_code}, Delivered/max: {delivered_count}/{max_items}, Value: €{delivery_value:.2f}, Avg. Value: €{avg_value:.2f}")

                # calculate total value all deliveries this date
                total_value += delivery_value
                # calculate total number of packages
                total_packages += delivered_count

    # print total value 
    print(f"Total value: €{total_value:.2f}")
    # print total number of packages
    print(f"Total number of packages: {total_packages}")

# adjust path to flightcodes file
script_dir = os.path.dirname(os.path.abspath(__file__))
delivery_codes_file = os.path.join(script_dir, "DeliveryCodes_v2.csv")
delivery_codes = read_delivery_file(delivery_codes_file)
delivery_data = dict()

# print the date and time in format HH:MM DD-MM-YYYY
import datetime
now = datetime.datetime.now()
print("Current date and time:")
print(now.strftime("%H:%M %d-%m-%Y"))

deliveries_dir = os.path.join(script_dir, "Deliveries") # adjust path to folder with the csv delivery files
target_date = input("Enter the delivery date in format DDMMYYYY: ") # ask user for a date in format DDMMYYYY
print("Target date:", target_date)

process_all_deliveries()
find_missing_deliveries()

input("press any key to close the application")
exit()
")` },
    { title: "Script 3", code: `print("hello script3")` },
    { title: "Script 4", code: `print("hello script4")` },
    { title: "Script 5", code: `print("hello script5")` },
    { title: "Script 6", code: `print("hello script6")` },
  ];

  const highlighted = await Promise.all(
    blocks.map(async (b) => ({
      ...b,
      html: await highlight(b.code, "python"),
    }))
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--background)]">
      <main className="min-h-screen w-full max-w-3xl bg-[var(--background)] px-6 py-20 sm:px-12 sm:py-28">
        <header className="flex flex-col gap-4">
          <h1 className="text-4xl md:text-5xl font-semibold text-black dark:text-zinc-50">
            Python Scripts Vault
          </h1>

          <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            A curated collection of <strong>practical Python scripts</strong> you can copy,
            study, and reuse in real projects.
          </p>
        </header>

        <div className="mt-12 flex flex-col gap-10">
          {highlighted.map((b, i) => (
            <section key={i} className="flex flex-col gap-3">
              <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                {b.title}
              </h2>

              <CodeBlock html={b.html} raw={b.code} />
            </section>
          ))}
        </div>

        <div className="mt-16 border-t border-black/10 dark:border-white/10 pt-8">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            © 2026 Python Scripts Vault. Published for educational use and permitted reuse.
          </p>
        </div>
      </main>
    </div>
  );
}
