//page.tsx

import { highlight } from "../lib/highlighter";
import CodeBlock from "./components/CodeBlock";

export default async function Home() {
  const blocks = [
    { title: "Game Match Analyzer", code: `"""
Gaming Match Stats

What this script does:
- Reads players.csv and matches.csv (semicolon separated)
- Aggregates simple stats per player:
  matches, wins, winrate, kills, deaths, K/D ratio
- Writes the result to output.csv

Files:
- players.csv
- matches.csv
- output.csv

Separator: ;
"""

import os


PLAYERS_FILE = "players.csv"
MATCHES_FILE = "matches.csv"
OUTPUT_FILE = "output.csv"


def read_csv(path):
    """
    Read a semicolon-separated CSV manually.
    Returns: (header_list, rows_list)
    """
    with open(path, "r", encoding="utf-8") as f:
        lines = [l.strip() for l in f if l.strip()]

    header = [h.strip() for h in lines[0].split(";")]
    rows = [[x.strip() for x in l.split(";")] for l in lines[1:]]
    return header, rows


def to_int(value):
    """
    Convert a string to int safely.
    Non-numeric values become 0.
    """
    value = (value or "").strip()
    return int(value) if value.isdigit() else 0


def main():
    print("Gaming Match Stats\\n")

    # Work in the same folder as the script,
    # so the CSV files are found reliably.
    os.chdir(os.path.dirname(os.path.abspath(__file__)))

    # Basic file checks
    if not os.path.isfile(PLAYERS_FILE):
        print("players.csv not found")
        return

    if not os.path.isfile(MATCHES_FILE):
        print("matches.csv not found")
        return

    # Read both CSV files
    p_header, p_rows = read_csv(PLAYERS_FILE)
    m_header, m_rows = read_csv(MATCHES_FILE)

    # Get the column indexes we need
    p_id = p_header.index("player_id")
    p_name = p_header.index("name")

    m_pid = m_header.index("player_id")
    m_kills = m_header.index("kills")
    m_deaths = m_header.index("deaths")
    m_win = m_header.index("win")  # expected values: 1 or 0

    # Build a stats dict per player
    # Key: player_id
    stats = {}

    for p in p_rows:
        pid = p[p_id]
        stats[pid] = {
            "name": p[p_name],
            "matches": 0,
            "wins": 0,
            "kills": 0,
            "deaths": 0,
        }

    # Aggregate match rows
    for m in m_rows:
        pid = m[m_pid]

        # Ignore match rows for unknown player IDs
        if pid not in stats:
            continue

        stats[pid]["matches"] += 1
        stats[pid]["wins"] += to_int(m[m_win])
        stats[pid]["kills"] += to_int(m[m_kills])
        stats[pid]["deaths"] += to_int(m[m_deaths])

    # Write the output report
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        f.write(
            "player_id;name;matches;"
            "wins;winrate;kills;deaths;kdr\\n"
        )

        for pid, s in stats.items():
            matches = s["matches"]
            wins = s["wins"]
            kills = s["kills"]
            deaths = s["deaths"]

            # Calculate winrate in %
            if matches > 0:
                winrate = round((wins / matches) * 100, 1)
            else:
                winrate = 0.0

            # Calculate K/D ratio
            # If deaths = 0, treat K/D as kills (avoid division by zero)
            if deaths > 0:
                kdr = round(kills / deaths, 2)
            else:
                kdr = float(kills)

            f.write(
                f"{pid};"
                f"{s['name']};"
                f"{matches};"
                f"{wins};"
                f"{winrate};"
                f"{kills};"
                f"{deaths};"
                f"{kdr}\\n"
            )

    print("output.csv created")


if __name__ == "__main__":
    main()
` },
    { title: "Delivery Tracker", code: ` """
Delivery Tracker

What this script does:
- Reads delivery codes from DeliveryCodes_v2.csv
- Scans all CSV files in the Deliveries folder
- Filters deliveries by a user-entered date (DDMMYYYY)
- Calculates per-delivery totals and averages
- Writes missing delivery codes to Missing_Deliveries_<date>.csv

Files:
- DeliveryCodes_v2.csv
- Deliveries/*.csv
- Missing_Deliveries_<date>.csv

Separator: ,
"""

import os

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
        #  check whether the delivery code appears in delivery_data 
        if delivery[0] not in delivery_data:
            missing_deliveries.append(delivery[0])

    missing_deliveries_file = f'Missing_Deliveries_{target_date}.csv'

    # writes the missing deliveries to csv
    with open(missing_deliveries_file, 'w') as f:
        for code in missing_deliveries:
            f.write(str(code) + ',\\n')
        print("File:", missing_deliveries_file, " created")

def process_all_deliveries():
    total_value = 0
    total_packages = 0

    # iterate over all files in the deliveries directory
    for filename in os.listdir(deliveries_dir):

        # gets the full path for that file
        fpath = os.path.join(deliveries_dir, filename)
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
                print(f"Delivery: {delivery_code}, Delivered/max: {delivered_count}/
                {max_items}, Value: €{delivery_value:.2f}, 
                Avg. Value: €{avg_value:.2f}")

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

# adjust path to folder with the csv delivery files
deliveries_dir = os.path.join(script_dir, "Deliveries") 

# ask user for a date in format DDMMYYYY
target_date = input("Enter the delivery date in format DDMMYYYY: ") 
print("Target date:", target_date)

process_all_deliveries()
find_missing_deliveries()

input("press any key to close the application")
exit()
")` },
    { title: "Inventory Discrepancy Tracker", code: `"""
Inventory Discrepancy Tracker

What this script does:
- Reads product and inventory data from CSV files
- Calculates expected and received inventory values per product
- Computes the discrepancy (received_value - expected_value)
- Writes the results to output.csv

Files:
- products.csv
- inventory.csv
- output.csv

Separator: ;
"""

import os
from decimal import Decimal
from datetime import datetime
import datetime

# Program introduction
print("Inventory Discrepancy Tracker")

now = datetime.datetime.now()
print("Current date and time:", now)

print("Welcome to the Inventory Discrepancy Tracker!")

# Set the file names
# Absolute paths to the CSV files
script_dir = os.path.dirname(os.path.abspath(__file__))
products_file = os.path.join(script_dir, "products.csv")
inventory_file = os.path.join(script_dir, "inventory.csv")
output_file = os.path.join(script_dir, "output.csv")

confirmation = ["y", "yes", "j", "ja"]


# Read a CSV file
# Returns a list of records parsed from the CSV file
def read_csv(filename):
  try:
    file = open(filename, 'r')
    lines = file.readlines()
    file.close()
    
    # Process all lines, skip the first one (header)
    data = []
    counter = 0
    for line in lines:
      if counter > 0:  # Skip the first line
        data.append(line.strip().split(";"))
      counter += 1
    
    print(f"✓ '{filename}' read: {len(data)} records")
    return data
    
  except FileNotFoundError:
    print(f"✗ ERROR: '{filename}' not found!")
    close_program()
  except Exception as error:
    print(f"✗ ERROR reading '{filename}': {error}")
    close_program()

# Find a column index based on its name from the CSV file header
def find_column(filename, column_name):
  file = open(filename, 'r')
  header = file.readline().strip().split(";")
  file.close()
  
  if column_name in header:
    return header.index(column_name)
  return -1

# Properly close the program with a user prompt
def close_program():
  print("Thank you for using this program!")
  print("Press Enter to exit...")
  exit()


# Read the products data from file
data_products = read_csv(products_file)

# Read the inventory data from file
data_inventory = read_csv(inventory_file)

# Determine which columns we need
column_id_inventory = find_column(inventory_file, "id")
column_expected_quantity = find_column(inventory_file, "expected_quantity")
column_received_quantity = find_column(inventory_file, "received_quantity")
column_unit_cost = find_column(inventory_file, "unit_cost")

column_id_product = find_column(products_file, "id")
column_product_name = find_column(products_file, "product_name")
column_warehouse_location = find_column(products_file, "warehouse_location")


# Calculate inventory discrepancies between expected and received quantities
count_overages = 0
count_shortages = 0

# Create a list with all products and their discrepancies
results = []

# Process each product's inventory data
for inventory in data_inventory:
  product_id = inventory[column_id_inventory]
  expected_quantity = Decimal(inventory[column_expected_quantity].replace(',', '.'))
  received_quantity = Decimal(inventory[column_received_quantity].replace(',', '.'))
  unit_cost = Decimal(inventory[column_unit_cost].replace(',', '.')) 
  expected_value = expected_quantity * unit_cost
  
  # Calculate the difference between expected and received values
  received_value = received_quantity * unit_cost
  discrepancy = received_value - expected_value

  # Find the corresponding product name and warehouse location, then add to results
  for product in data_products:
    if product[column_id_product] == product_id:
      results.append({
        "id": product_id,
        "name": product[column_product_name],
        "location": product[column_warehouse_location],
        "discrepancy": discrepancy
      })
      break

  # Check if the discrepancy is negative (shortage) or positive (overage)
  discrepancy = discrepancy.quantize(Decimal('0.01'))  # Round to 2 decimal places
  if discrepancy < 0:  # Shortage
    count_shortages += 1
  elif discrepancy > 0:  # Overage
    count_overages += 1

# Display summary statistics
print(f"Number of products with overage: {count_overages}")
print(f"Number of products with shortage: {count_shortages}")
print()

print(f"Total number of products tracked: {len(results)}")
print()

# Check if output file already exists
if os.path.isfile(output_file):
  answer = input(f"'{output_file}' already exists. Overwrite? (y/n): ")
  if answer.lower() not in confirmation:
    close_program()
else:
  answer = input(f"Create '{output_file}'? (y/n): ")
  if answer.lower() not in confirmation:
    close_program()

# Write the results to the output file
try:
  output_file_handle = open(output_file, 'w')
  
  # Write the header row to the file
  output_file_handle.write("id;product_name;warehouse_location;discrepancy\\n")
  
  # Process each result and write to the file
  for result in results:
    output_file_handle.write(f"{result['id']};{result['name']};
    {result['location']};{result['discrepancy']}\\n")
  
  # Close the output file
  output_file_handle.close()
  
  print()
  print(f"✓ '{output_file}' created successfully!")
  print(f"✓ {len(results)} products analyzed and saved.")
  
except Exception as error:
  print(f"✗ Cannot create '{output_file}': {error}")
  close_program()

close_program()
` },
    { title: "YouTube Premium Subscription Analyzer", code: `"""
YouTube Premium Subscription Analyzer

What this script does:
- Reads users and subscriptions from CSV files
- Finds the minimum subscription fee across all users
- Identifies users paying above the minimum fee
- Writes fee differences to output.csv

Files:
- users.csv
- subscriptions.csv
- output.csv

Separator: ;
"""

import os
from decimal import Decimal
from datetime import datetime

# Set working directory to script location
os.chdir(os.path.dirname(os.path.abspath(__file__)))

# Note: CSV parsing is done manually because Python's csv module treats field
# separators inconsistently when user data contains delimiters. All input files
# MUST use semicolon as the field separator.

# File Format Reference:
# subscriptions.csv
#   user_id;subscription_fee
# users.csv
#   user_id;username;address;postcode;city;email
# output.csv
#   user_id;username;city;fee_difference

print("=" * 50)
print("YouTube Premium Subscription Analyzer")
print(f"Timestamp: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
print("=" * 50)

# File Configuration
USER_FILE = "users.csv"
SUBSCRIPTION_FILE = "subscriptions.csv"
OUTPUT_FILE = "output.csv"
MATCHING_COLUMN = "user_id"
CONFIRM_RESPONSES = ["y", "yes"]

def display_array(data_array):
    """Display all elements from a 2D array.
    
    Args:
        data_array: A 2D list to display
    """
    for row in data_array:
        for element in row:
            print(element)

def index_of(array, value):
    """Find index of value in array, returns -1 if not found.
    
    Args:
        array: List to search in
        value: Value to find
        
    Returns:
        Index of value or -1 if not found
    """
    try:
        return array.index(value)
    except ValueError:
        return -1

def exit_program():
    """Gracefully exit the program after user confirmation."""
    print("\\nProgram terminated.")
    input("Press Enter to exit...")
    quit()
  

# Verify source files exist
if not os.path.isfile(USER_FILE):
    print(f"ERROR: Required file not found: {USER_FILE}")
    exit_program()
if not os.path.isfile(SUBSCRIPTION_FILE):
    print(f"ERROR: Required file not found: {SUBSCRIPTION_FILE}")
    exit_program()

# Load user data from file
user_headers = []
user_data = []
with open(USER_FILE, 'r', encoding='utf-8') as file:
    lines = file.readlines()

for line_index, line in enumerate(lines):
    line = line.strip()
    if not line:
        continue
    fields = [field.strip() for field in line.split(";")]
    if line_index == 0:
        user_headers = fields
    else:
        user_data.append(fields)


# Check if output file already exists
if os.path.isfile(OUTPUT_FILE):
    response = input(f"\\nFile '{OUTPUT_FILE}' already exists. Overwrite? (y/n): ")
    if response.lower() not in CONFIRM_RESPONSES:
        exit_program()
else:
    response = input(f"\\nCreate new file '{OUTPUT_FILE}'? (y/n): ")
    if response.lower() not in CONFIRM_RESPONSES:
        exit_program()

# Load subscription fee data from file
subscription_headers = []
subscription_data = []
with open(SUBSCRIPTION_FILE, 'r', encoding='utf-8') as file:
    lines = file.readlines()

for line_index, line in enumerate(lines):
    line = line.strip()
    if not line:
        continue
    fields = [field.strip() for field in line.split(";")]
    if line_index == 0:
        subscription_headers = fields
    else:
        subscription_data.append(fields)

# Find the subscription fee column
fee_col_index = index_of(subscription_headers, "subscription_fee")
if fee_col_index == -1:
    print(f"ERROR: Column 'subscription_fee' not found in {SUBSCRIPTION_FILE}")
    exit_program()

# Calculate minimum subscription fee across all users
min_fee = None
for subscription in subscription_data:
    try:
        fee_amount = Decimal(subscription[fee_col_index])
    except (ValueError, IndexError):
        continue
    if min_fee is None or fee_amount < min_fee:
        min_fee = fee_amount

if min_fee is None:
    min_fee = Decimal('0')

# Create output file structure and headers
output_headers = ["user_id", "username", "city", "fee_difference"]
output_rows = [output_headers]

# Find users with subscription fees above minimum threshold
# subscription_data format: user_id;subscription_fee
# fee_col_index points to the fee column
for subscription in subscription_data:
    try:
        current_fee = Decimal(subscription[fee_col_index])
    except (ValueError, IndexError):
        continue
    
    # Check if subscription fee exceeds minimum (anomaly detection)
    if current_fee > min_fee:
        # Match user ID to retrieve full user information
        # user_data format: user_id;username;address;postcode;city;email
        for user in user_data:
            if user[0] == subscription[0]:  # Match by user_id
                fee_difference = current_fee - min_fee
                output_row = [
                    user[0],              # user_id
                    user[1],              # username
                    user[4],              # city
                    str(fee_difference)   # fee_difference
                ]
                output_rows.append(output_row)

# Write output to CSV file
with open(OUTPUT_FILE, "w", encoding='utf-8') as file:
    for row in output_rows:
        file.write(";".join(row) + "\\n")

print(f"\\nSuccess! Report written to '{OUTPUT_FILE}'")
print(f"Total anomalies detected: {len(output_rows) - 1}")

exit_program()
` },
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
      <main className="min-h-screen w-full max-w-4xl bg-[var(--background)] px-6 py-20 sm:px-12 sm:py-28">
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
