import markdown
import requests
import json

# Function to fetch a Markdown file from a URI and return its content
def fetch_markdown_from_uri(uri):
    response = requests.get(uri)
    if response.status_code == 200:
        return response.text
    else:
        raise Exception(f"Failed to fetch Markdown content from {uri}. HTTP Status Code: {response.status_code}")

# Function to parse Markdown content and return a list of dictionaries
def parse_markdown_to_dict(md_content):
    lines = md_content.split('\n')
    types = {}
    topics = []
    current_topic = None
    type = None
    isFree = False 
    in_learning_outcomes = False  # Flag to indicate if we're in the "Learning Outcomes" section
    in_resources = False # Flag for Resources

    for line in lines:
        line = line.lstrip() 
        if line.startswith('# '):
            domain = line[2:]
        elif line.startswith('### With this module'):
            pass
        elif line.startswith('### '):
            if current_topic:  # Save the previous topic if it exists
                topics.append(current_topic)
            current_topic = {'domain': domain, 'name': line[4:], 'status': 'Active' }  # Start a new topic
            in_learning_outcomes = False  # Reset the flag when starting a new topic
        elif line.startswith('With this topic'):
            current_topic['overview'] = line
        elif line.startswith('#### Learning Outcomes'):
            in_learning_outcomes = True  # Set the flag to True
            current_topic['skills'] = []  # Initialize the skills array
        elif in_learning_outcomes:
            if line.strip() == '':  # Check for a blank line
                in_learning_outcomes = False  # Reset the flag
            elif line.startswith('*'):  # Check for bullet points
                current_topic['skills'].append(line[2:])
        elif line.startswith('#### Resources'):
            in_resources = True  # Set the flag to True
            current_topic['resources'] = []  # Initialize the skills array
        elif in_resources:
            if line.strip() == '':  # Check for a blank line
                in_resources = False  # Reset the flag
            elif line.startswith('*'):  # Check for bullet points
                resource = {}
                start_name = line.find('[') + 1
                end_name = line.find('`')
                start_type = end_name + 1
                end_type = line.find('`', start_type + 1)
                start_url = line.find('(http') + 1
                end_url = line.find(')', start_url)

                resource['name'] = line[start_name:end_name].strip()
                resource['link'] = line[start_url:end_url].strip()
        
                type = ""
                isFree = True  # Default value
                if (start_type > 0):
                    type = line[start_type:end_type].strip()
                    if type.endswith(' ($)'):
                        type = type[:-4]  # Remove the last 4 characters ' ($)'
                        isFree = False
                    types[type] = 1
                    resource['type'] = type
                    resource['isFree'] = isFree
                    
                current_topic['resources'].append(resource)

    if current_topic:  # Save the last topic if it exists
        topics.append(current_topic)

    print(types)
    return topics

# List of sample URIs (replace with the URIs to your Markdown files)
sample_uris = [
    "https://raw.githubusercontent.com/engineerkit/engineerkit/main/modules/architecture.md",
    "https://raw.githubusercontent.com/engineerkit/engineerkit/main/modules/automated-testing.md",
    "https://raw.githubusercontent.com/engineerkit/engineerkit/main/modules/clean-code.md",
    "https://raw.githubusercontent.com/engineerkit/engineerkit/main/modules/computing.md",
    "https://raw.githubusercontent.com/engineerkit/engineerkit/main/modules/craftsmanship.md",
    "https://raw.githubusercontent.com/engineerkit/engineerkit/main/modules/data.md",
    "https://raw.githubusercontent.com/engineerkit/engineerkit/main/modules/human-experience.md",
    "https://raw.githubusercontent.com/engineerkit/engineerkit/main/modules/infrastructure.md",
    "https://raw.githubusercontent.com/engineerkit/engineerkit/main/modules/internet.md",
    "https://raw.githubusercontent.com/engineerkit/engineerkit/main/modules/monitoring.md",
    "https://raw.githubusercontent.com/engineerkit/engineerkit/main/modules/operations.md",
    "https://raw.githubusercontent.com/engineerkit/engineerkit/main/modules/product-life-cycle.md",
    "https://raw.githubusercontent.com/engineerkit/engineerkit/main/modules/programming-languages.md",
    "https://raw.githubusercontent.com/engineerkit/engineerkit/main/modules/security.md",
    "https://raw.githubusercontent.com/engineerkit/engineerkit/main/modules/tooling.md",
]

all_topics = []

# Loop through each URI in the list
for uri in sample_uris:
    # Fetch the Markdown content
    md_content = fetch_markdown_from_uri(uri)
    
    if md_content:
        # Parse the Markdown content to a list of dictionaries
        topics = parse_markdown_to_dict(md_content)
        all_topics.extend(topics)  # Add the topics to the master list

# Convert the master list to JSON
json_content = json.dumps(all_topics, indent=4)

# Write the JSON content to a file
with open('../mongosh/institute-topics-data.json', 'w') as json_file:
    json_file.write(json_content)

# Print a message to indicate that the file has been written
print("JSON content has been written to 'src/mongosh/institute-topics-data.json'")
