def longest_unqiue_substring(s):
    character_positions = {}
    longest_substring_length = 0
        
    tail = 0
        
    for (head, char) in enumerate(s):
        # We have a duplicate in our set, shrink the window
        if char in character_positions:
            # Shrink to the head to the location of the fist instance of the character
            #   OR Why would the start_of_window ever be higher than where we shrink to?
            tail = character_positions[char] + 1
            
        longest_substring_length = max(longest_substring_length, head - tail + 1)
        
        # Set the new character location
        character_positions[char] = head

    return longest_substring_length

print(longest_unqiue_substring("abba"))